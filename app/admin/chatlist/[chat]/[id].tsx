import { componentReadyData } from "@/assets/data/messages.json";
import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";
import { useGetChatHistoryQuery } from "@/store/slices/chatApiSlice";
import { Message, TypingUser } from "@/types/chat";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const { id: chatId, chat: chatType } = useLocalSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const { socket, connectionStatus, joinRoom, stopTyping, emit } = useSocket();

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
  console.log("Query result:", chatData?.data?.messages, chatType);

  const [messages, setMessages] = useState<Message[]>();
  const [inputText, setInputText] = useState("");
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploadingState, setIsUploadingState] = useState(false);
  const flatListRef = useRef(null);

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
    if (!socket || !chatId || connectionStatus !== "connected") {
      console.log("Cannot join room:", {
        hasSocket: !!socket,
        chatId,
        connectionStatus,
      });
      return;
    }

    const roomData = {
      chatType: chatType as string,
      supportId: chatId as string,
    };

    // Use the joinRoom function from useSocket hook
    joinRoom(roomData);

    // Mark chat as read when entering
    emit("markChatAsRead", { chatType, chatId });

    return () => {
      // Stop typing when leaving
      if (isTyping && user?.id) {
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

  console.log(isTyping, stopTyping);

  const currentUserId = componentReadyData?.currentUserId;

  // Send message function
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: `msg_${Date.now()}`,
        senderId: currentUserId,
        senderName: "You",
        type: "text",
        content: inputText.trim(),
        timestamp: new Date().toISOString(),
        status: "sent",
        isOwn: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Handle image send
  const handleSendImage = (imageUri, caption) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUserId,
      senderName: "You",
      type: "image",
      imageUrl: imageUri,
      caption: caption || "",
      timestamp: new Date().toISOString(),
      status: "sent",
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
          {/* header */}
          <View className="px-6">
            <CustomHeader text="Chat" />
          </View>

          <ChatHeader componentReadyData={componentReadyData} />

          {/* message list */}
          <FlatList
            className=" p-6 bg-[#F8FAF8]"
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <RenderMessage item={item} currentUserId={currentUserId} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          {/* Input Section */}
          <ChatInputSection
            inputText={inputText}
            setInputText={setInputText}
            onSendMessage={handleSendMessage}
            onSendImage={handleSendImage}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
