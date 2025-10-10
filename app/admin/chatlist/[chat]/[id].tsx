// ===== FIXED VERSION FOR USER 1 (Document 10) =====

import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import ConnectionStatus from "@/components/shared/ConnectionStatus";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import TypingIndicator from "@/components/shared/TypingIndicator";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";
import { useGetChatHistoryQuery } from "@/store/slices/chatApiSlice";
import { useUploadImageMutation } from "@/store/slices/employeeApiSlice";
import { Message, TypingUser } from "@/types/chat";
import { uploadImageToServer } from "@/utils/uploadImageToServer";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const { id: chatId, chat: chatType } = useLocalSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const { socket, connectionStatus, joinRoom, stopTyping, emit } = useSocket();

  const flatListRef = useRef(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingEmitRef = useRef<number>(0);
  const hasLoadedInitialMessages = useRef(false); // ⭐ ADD THIS

  // Get chat data
  const { data: chatData } = useGetChatHistoryQuery(
    {
      chatId: chatId as string,
      chatType: chatType as string,
    },
    {
      skip: !chatId || !chatType,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploadingState, setIsUploadingState] = useState(false);

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const isLoading = isUploadingImage || isUploadingState;

  // ⭐ Reset when chatId changes
  useEffect(() => {
    hasLoadedInitialMessages.current = false;
    setMessages([]);
  }, [chatId]);

  // ⭐ Load initial messages ONLY ONCE
  useEffect(() => {
    if (hasLoadedInitialMessages.current) return; // Exit if already loaded

    if (chatData?.data?.messages) {
      const formattedMessages = chatData.data.messages.map((msg: any) => ({
        id: msg._id || msg.id,
        message: msg.message || msg.content,
        senderId: msg.senderId._id,
        senderRole: msg.senderRole,
        createdAt: msg.createdAt,
        imageUrl: msg.imageUrl,
        type: msg.imageUrl ? "image" : "text",
        content: msg.message || msg.content,
        timestamp: msg.createdAt,
        isOwn: msg.senderId._id === user?._id,
      }));
      setMessages(formattedMessages.reverse());
      hasLoadedInitialMessages.current = true;
    } else if (chatData?.data && !chatData?.data?.messages) {
      // Empty chat - mark as loaded
      hasLoadedInitialMessages.current = true;
    }
  }, [chatData, user?._id]);

  // Join chat room and mark as read
  useEffect(() => {
    if (!socket || !chatId || connectionStatus !== "connected") {
      return;
    }

    const roomData = {
      chatType: chatType as string,
      supportId: chatId as string,
    };

    joinRoom(roomData);
    emit("markChatAsRead", { chatType, chatId });

    return () => {
      if (isTyping && user?._id) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        stopTyping({
          chatType: chatType as string,
          supportId: chatId as string,
          userId: user._id,
        });
      }
    };
  }, [
    socket,
    chatId,
    chatType,
    connectionStatus,
    joinRoom,
    emit,
    isTyping,
    user?._id,
    stopTyping,
  ]);

  // ⭐ Handle real-time messages - REMOVED chatData from dependencies
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: any) => {
      const actualSenderId =
        typeof message.senderId === "object"
          ? message.senderId._id
          : message.senderId;

      const formattedMessage: Message = {
        id: message._id || message.id || Date.now().toString(),
        message: message.message || message.content,
        senderId: actualSenderId,
        senderRole: message.senderRole,
        createdAt: message.createdAt,
        imageUrl: message.imageUrl,
        type: message.imageUrl ? "image" : "text",
        content: message.message || message.content,
        timestamp: message.createdAt,
        isOwn: actualSenderId === user?._id,
      };

      setMessages((prev) => {
        // Check for duplicates
        const exists = prev.some((msg) => msg.id === formattedMessage.id);
        if (exists) return prev;

        return [formattedMessage, ...prev];
      });

      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    };

    const handleTyping = ({ userId }: { userId: string }) => {
      if (userId !== user?._id) {
        setTypingUsers((prev) => {
          if (!prev.find((u) => u.userId === userId)) {
            return [...prev, { userId }];
          }
          return prev;
        });
      }
    };

    const handleStopTyping = ({ userId }: { userId: string }) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== userId));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [socket, user?._id]); // ⭐ REMOVED chatData

  // Handle typing
  const handleTextChange = useCallback(
    (text: string) => {
      setInputText(text);

      if (!socket || !user?._id) return;

      if (text.length > 0) {
        const now = Date.now();

        if (now - lastTypingEmitRef.current > 2000) {
          socket.emit("typing", {
            chatType: chatType as string,
            supportId: chatId as string,
            userId: user._id,
          });
          lastTypingEmitRef.current = now;

          if (!isTyping) {
            setIsTyping(true);
          }
        }

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          socket.emit("stop_typing", {
            chatType: chatType as string,
            supportId: chatId as string,
            userId: user._id,
          });
        }, 3000);
      } else if (text.length === 0 && isTyping) {
        setIsTyping(false);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        socket.emit("stop_typing", {
          chatType: chatType as string,
          supportId: chatId as string,
          userId: user._id,
        });
      }
    },
    [socket, user?._id, isTyping, chatType, chatId]
  );

  // Send text message
  const handleSendMessage = useCallback(() => {
    if (!inputText.trim() || !socket) return;

    if (connectionStatus !== "connected") {
      Alert.alert(
        "Connection Error",
        "Unable to send message. Please check your connection and try again.",
        [{ text: "OK" }]
      );
      return;
    }

    const messageData = {
      chatType,
      supportId: chatId as string,
      message: inputText.trim(),
    };

    emit("sendMessage", messageData);
    setInputText("");

    if (isTyping) {
      setIsTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      stopTyping({
        chatType: chatType as string,
        supportId: chatId as string,
        userId: user?._id || "",
      });
    }
  }, [
    inputText,
    socket,
    connectionStatus,
    chatType,
    chatId,
    isTyping,
    user?._id,
    emit,
    stopTyping,
  ]);

  // Send image message
  const handleSendImage = useCallback(
    async (imageUri: string, caption?: string) => {
      if (!socket || !imageUri) return;

      if (connectionStatus !== "connected") {
        Alert.alert(
          "Connection Error",
          "Unable to send image. Please check your connection and try again.",
          [{ text: "OK" }]
        );
        return;
      }

      try {
        setIsUploadingState(true);

        const imageUrl = await uploadImageToServer(imageUri, uploadImage);

        if (!imageUrl) {
          throw new Error("Failed to upload image");
        }

        const messageData = {
          chatType,
          supportId: chatId as string,
          message: caption || "",
          imageUrl: imageUrl,
        };

        emit("sendMessage", messageData);
      } catch (error) {
        console.error("Error sending image:", error);
        Alert.alert(
          "Upload Failed",
          "Failed to send image. Please try again.",
          [{ text: "OK" }]
        );
      } finally {
        setIsUploadingState(false);
      }
    },
    [socket, connectionStatus, chatType, chatId, uploadImage, emit]
  );

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1">
          {/* header */}
          <View className="px-6">
            <CustomHeader text="Chat" />
          </View>

          <ChatHeader
            id={chatData?.data?.createdByInfo?.createdById}
            name={chatData?.data?.createdByInfo?.name}
            number={chatData?.data?.createdByInfo?.number}
            showCloseSupport={true}
          />

          <ConnectionStatus connectionStatus={connectionStatus} />

          {/* message list */}
          <FlatList
            className="flex-1 px-6 bg-[#F8FAF8]"
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <RenderMessage item={item} currentUserId={user?._id} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            inverted={true}
            ListEmptyComponent={
              <View className="items-center justify-center h-[60vh]">
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={48}
                  color="#9CA3AF"
                />
                <Text
                  className="text-gray-500 text-center mt-4"
                  style={{ fontFamily: "SourceSans3-Medium" }}
                >
                  No messages yet
                </Text>
              </View>
            }
          />

          <TypingIndicator typingUsers={typingUsers} />

          {/* Input Section */}
          {chatData?.data?.supportInfo?.status === "closed" ? (
            <TouchableOpacity className="py-4 bg-neutral-light-active">
              <Text
                style={{
                  fontFamily: "SourceSans3-Medium",
                }}
                className="text-error-normal text-center"
              >
                Closed
              </Text>
            </TouchableOpacity>
          ) : (
            <ChatInputSection
              inputText={inputText}
              setInputText={handleTextChange}
              onSendMessage={handleSendMessage}
              onSendImage={handleSendImage}
              isUploading={isLoading}
              disabled={isLoading || connectionStatus !== "connected"}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
