import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";
import { useGetChatHistoryQuery } from "@/store/slices/chatApiSlice";
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
  const { id: supportId } = useLocalSearchParams();
  const currentUserId = useAppSelector((state) => state.auth.user?._id);
  const { socket, isConnected } = useSocket();

  const { data: chatData, refetch } = useGetChatHistoryQuery({
    supportId: supportId as string,
    chatType: "support",
  });

  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Transform API messages to match your RenderMessage component format
  const messages =
    chatData?.data.messages.map((msg) => ({
      id: msg._id,
      senderId: msg.senderId._id,
      senderName: msg.senderId.name,
      type: "text",
      content: msg.message,
      timestamp: msg.createdAt,
      status: "sent",
      isOwn: msg.senderId._id === currentUserId,
    })) || [];

  // Socket setup for real-time messages
  useEffect(() => {
    if (!socket || !isConnected || !supportId) return;

    // Join the chat room
    socket.emit("joinRoom", { chatType: "support", supportId });
    console.log("Joined room:", supportId);

    // Listen for new messages
    const handleNewMessage = (messageData: any) => {
      console.log("New message received:", messageData);
      refetch(); // Refetch to get updated messages

      // Auto-scroll to bottom when new message arrives
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, isConnected, supportId, refetch]);

  // Send message function
  const handleSendMessage = () => {
    if (!inputText.trim() || !socket?.connected) return;

    // Send via socket for real-time delivery
    socket.emit("sendMessage", {
      chatType: "support",
      supportId,
      message: inputText.trim(),
    });

    setInputText("");

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Handle image send
  const handleSendImage = (imageUri: string, caption?: string) => {
    if (!socket?.connected) return;

    // Send image via socket
    socket.emit("sendMessage", {
      chatType: "support",
      supportId,
      imageUrl: imageUri,
      message: caption || "",
    });

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messages.length]);

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
          <ChatHeader
          // supportInfo={chatData?.data.supportInfo}
          // createdByInfo={chatData?.data.createdByInfo}
          />

          {/* Message List */}
          <FlatList
            className="flex-1 p-6 bg-[#F8FAF8]"
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <RenderMessage item={item} currentUserId={currentUserId} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
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
