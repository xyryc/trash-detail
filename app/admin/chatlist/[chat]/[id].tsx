import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import ConnectionStatus from "@/components/shared/ConnectionStatus";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import TypingIndicator from "@/components/shared/TypingIndicator";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";
import {
  useCloseProblemMutation,
  useCloseSupportMutation,
} from "@/store/slices/adminApiSlice";
import { useGetChatHistoryQuery } from "@/store/slices/chatApiSlice";
import { useUploadImageMutation } from "@/store/slices/employeeApiSlice";
import { Message, TypingUser } from "@/types/chat";
import { uploadImageToServer } from "@/utils/uploadImageToServer";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const hasLoadedInitialMessages = useRef(false);
  const router = useRouter();

  // ⭐ Create room data based on chatType
  const roomData = useMemo(() => {
    const data: any = {
      chatType: chatType as string,
    };

    if (chatType === "problem") {
      data.problemId = chatId as string;
    } else {
      data.supportId = chatId as string;
    }

    return data;
  }, [chatType, chatId]);

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

  // Reset when chatId changes
  useEffect(() => {
    hasLoadedInitialMessages.current = false;
    setMessages([]);
  }, [chatId]);

  // Load initial messages ONLY ONCE
  useEffect(() => {
    if (hasLoadedInitialMessages.current) return;

    if (chatData?.data?.messages) {
      const formattedMessages = chatData.data.messages.map((msg: any) => ({
        id: msg._id || msg.id,
        message: msg.message || msg.content || "", // ⭐ Ensure never undefined
        senderId: msg.senderId._id,
        senderRole: msg.senderRole,
        createdAt: msg.createdAt,
        imageUrl: msg.imageUrl,
        type: msg.imageUrl ? "image" : "text",
        content: msg.message || msg.content || "", // ⭐ Ensure never undefined
        timestamp: msg.createdAt,
        isOwn: msg.senderId._id === user?._id,
      }));
      setMessages(formattedMessages.reverse());
      hasLoadedInitialMessages.current = true;
    } else if (chatData?.data && !chatData?.data?.messages) {
      hasLoadedInitialMessages.current = true;
    }
  }, [chatData, user?._id]);

  // Join chat room and mark as read
  useEffect(() => {
    if (!socket || !chatId || connectionStatus !== "connected") {
      return;
    }

    console.log("🚪 Joining room:", roomData);
    joinRoom(roomData);

    // ⭐ Mark as read with correct field name based on chatType
    const markAsReadData = {
      chatType: chatType as string,
      ...(chatType === "problem"
        ? { problemId: chatId as string }
        : { chatId: chatId as string }),
    };

    console.log("📖 Marking as read:", markAsReadData);
    emit("markChatAsRead", markAsReadData);

    return () => {
      if (isTyping && user?._id) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        stopTyping({
          ...roomData,
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
    roomData,
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
        message: message.message || message.content || "", // ⭐ Ensure never undefined
        senderId: actualSenderId,
        senderRole: message.senderRole,
        createdAt: message.createdAt,
        imageUrl: message.imageUrl,
        type: message.imageUrl ? "image" : "text",
        content: message.message || message.content || "", // ⭐ Ensure never undefined
        timestamp: message.createdAt,
        isOwn: actualSenderId === user?._id,
      };

      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === formattedMessage.id);
        if (exists) return prev;
        return [formattedMessage, ...prev];
      });

      setTimeout(() => {
        //@ts-ignore
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    };

    const handleTyping = ({ userId }: { userId: string }) => {
      if (userId !== user?._id) {
        //@ts-ignore
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
  }, [socket, user?._id]);

  // Handle typing
  const handleTextChange = useCallback(
    (text: string) => {
      setInputText(text);

      if (!socket || !user?._id) return;

      if (text.length > 0) {
        const now = Date.now();

        if (now - lastTypingEmitRef.current > 2000) {
          socket.emit("typing", {
            ...roomData, // ⭐ Use roomData
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

        //@ts-ignore
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          socket.emit("stop_typing", {
            ...roomData, // ⭐ Use roomData
            userId: user._id,
          });
        }, 3000);
      } else if (text.length === 0 && isTyping) {
        setIsTyping(false);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        socket.emit("stop_typing", {
          ...roomData, // ⭐ Use roomData
          userId: user._id,
        });
      }
    },
    [socket, user?._id, isTyping, roomData]
  );

  // Send text message
  const handleSendMessage = useCallback(() => {
    if (!inputText.trim() || !socket) return;

    if (connectionStatus !== "connected") {
      Alert.alert(
        "Connection Error",
        "Unable to send message. Please check your connection and try again."
      );
      return;
    }

    const messageData = {
      ...roomData, // ⭐ Use roomData
      message: inputText.trim(),
    };

    console.log("📤 Sending message:", messageData);
    emit("sendMessage", messageData);
    setInputText("");

    if (isTyping) {
      setIsTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      stopTyping({
        ...roomData, // ⭐ Use roomData
        userId: user?._id || "",
      });
    }
  }, [
    inputText,
    socket,
    connectionStatus,
    roomData,
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
          "Unable to send image. Please check your connection and try again."
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
          ...roomData, // ⭐ Use roomData
          message: caption || "",
          imageUrl: imageUrl,
        };

        emit("sendMessage", messageData);
      } catch (error) {
        console.error("Error sending image:", error);
        Alert.alert("Upload Failed", "Failed to send image. Please try again.");
      } finally {
        setIsUploadingState(false);
      }
    },
    [socket, connectionStatus, roomData, uploadImage, emit]
  );

  // close problem
  const [closeProblem] = useCloseProblemMutation();
  console.log(chatId);
  const handleCloseProblem = () => {
    Alert.alert(
      "Close problem",
      "Are you sure you want to close this problem chat?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: async () => {
            try {
              await closeProblem({ problemId: chatId as string }).unwrap();
              Alert.alert("Closed", "Problem chat has been closed.", [
                { text: "OK", onPress: () => router.back() },
              ]);
            } catch (error: any) {
              Alert.alert(
                "Error",
                error?.data?.message || "Failed to close problem."
              );
            }
          },
        },
      ]
    );
  };

  // Close support
  const [closeSupport] = useCloseSupportMutation();

  const handleCloseSupport = () => {
    Alert.alert(
      "Close Support",
      "Are you sure you want to close this support chat?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: async () => {
            try {
              await closeSupport({ supportId: chatId as string }).unwrap();
              Alert.alert("Closed", "Support chat has been closed.", [
                { text: "OK", onPress: () => router.back() },
              ]);
            } catch (error: any) {
              Alert.alert(
                "Error",
                error?.data?.message || "Failed to close support."
              );
            }
          },
        },
      ]
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
          <View className="px-6">
            <CustomHeader text="Chat" />
          </View>

          {chatType === "support" ? (
            <ChatHeader
              id={chatData?.data?.createdByInfo?.createdById}
              problemId={chatId as string}
              name={chatData?.data?.createdByInfo?.name}
              number={chatData?.data?.createdByInfo?.number}
              type="support"
              supportStatus={chatData?.data?.supportInfo?.status}
              handleCloseSupport={handleCloseSupport}
            />
          ) : (
            <ChatHeader
              id={chatData?.data?.problemInfo?.id}
              problemId={chatId as string}
              title={chatData?.data?.problemInfo?.title}
              type="problem"
              handleCloseProblem={handleCloseProblem}
            />
          )}

          <ConnectionStatus connectionStatus={connectionStatus} />

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

          {chatData?.data?.supportInfo?.status === "closed" ? (
            <TouchableOpacity className="py-4 bg-neutral-light-active">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
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
