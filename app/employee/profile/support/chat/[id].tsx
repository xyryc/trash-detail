import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";
import { useGetChatHistoryQuery } from "@/store/slices/chatApiSlice";
import { useUploadImageMutation } from "@/store/slices/employeeApiSlice";
import { Message, TypingUser } from "@/types/chat";
import { uploadImageToServer } from "@/utils/uploadImageToServer";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { socket, connectionStatus, joinRoom, sendTyping, stopTyping, emit } =
    useSocket();
  const flatListRef = useRef<FlatList>(null);
  const { id: supportId } = useLocalSearchParams();
  const chatType = "support";

  // Get chat data
  const { data: chatData } = useGetChatHistoryQuery(
    {
      supportId,
      chatType,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  // console.log("chat data", chatData?.data?.messages);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [isUploadingState, setIsUploadingState] = useState(false);

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const isLoading = isUploadingImage || isUploadingState;

  // Load initial messages
  useEffect(() => {
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
    }
  }, [chatData, user?._id]);

  // Join chat room and mark as read
  useEffect(() => {
    if (!socket || !supportId || connectionStatus !== "connected") {
      console.log("Cannot join room:", {
        hasSocket: !!socket,
        supportId,
        connectionStatus,
      });
      return;
    }

    const roomData = {
      chatType,
      supportId: supportId as string,
    };

    // Use the joinRoom function from useSocket hook
    joinRoom(roomData);

    // Mark chat as read when entering
    emit("markChatAsRead", { chatType, chatId: supportId });

    return () => {
      // Stop typing when leaving
      if (isTyping && user?.id) {
        stopTyping({
          chatType,
          supportId: supportId as string,
          userId: user._id,
        });
      }
    };
  }, [
    chatData,
    socket,
    supportId,
    chatType,
    connectionStatus,
    joinRoom,
    emit,
    isTyping,
    user?._id,
    stopTyping,
  ]);

  // Handle real-time messages
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

      setMessages((prev) => [formattedMessage, ...prev]);

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
  }, [socket, user?._id, chatData]);

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
      supportId: supportId as string,
      message: inputText.trim(),
    };

    emit("sendMessage", messageData);
    setInputText("");

    if (isTyping) {
      setIsTyping(false);
      stopTyping({
        chatType,
        supportId: supportId as string,
        userId: user?._id || "",
      });
    }
  }, [
    inputText,
    socket,
    connectionStatus,
    chatType,
    supportId,
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
          supportId: supportId as string,
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
    [socket, connectionStatus, chatType, supportId, uploadImage, emit]
  );

  const TypingIndicator = () => {
    if (typingUsers.length === 0) return null;

    return (
      <View className="px-6 py-2">
        <Text className="text-gray-500 text-sm italic">User is typing...</Text>
      </View>
    );
  };

  const ConnectionStatus = () => {
    if (connectionStatus === "connected") return null;

    return (
      <View className="bg-red-100 px-4 py-2">
        <Text className="text-red-800 text-center text-sm">
          {connectionStatus === "connecting"
            ? "Connecting..."
            : "Offline - Messages will be sent when reconnected"}
        </Text>
      </View>
    );
  };

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
          {/* Header */}
          <View className="px-6">
            <CustomHeader text={chatData?.data.supportInfo.title || "Chat"} />
          </View>

          {/* Chat Header with support info */}
          <ChatHeader />

          <ConnectionStatus />

          {/* Message List */}
          <FlatList
            className="flex-1 p-6 bg-[#F8FAF8]"
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <RenderMessage item={item} currentUserId={user?._id} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            inverted={true}
          />

          <TypingIndicator />

          {/* Input Section */}
          <ChatInputSection
            inputText={inputText}
            setInputText={setInputText}
            onSendMessage={handleSendMessage}
            onSendImage={handleSendImage}
            isUploading={isLoading}
            disabled={isLoading || connectionStatus !== "connected"}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
