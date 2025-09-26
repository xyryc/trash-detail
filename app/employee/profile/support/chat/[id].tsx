import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import { useSocket } from "@/hooks/useSocket";
import { useAppSelector } from "@/store/hooks";
import { useGetChatHistoryQuery } from "@/store/slices/chatApiSlice";
import { useUploadImageMutation } from "@/store/slices/employeeApiSlice";
import { uploadImageToServer } from "@/utils/uploadImageToServer";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const [inputText, setInputText] = useState("");
  const [isUploadingState, setIsUploadingState] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  console.log("Raw API data:", chatData?.data?.messages);

  // Transform API messages to match your RenderMessage component format

  const messages =
    chatData?.data.messages.map((msg) => {
      const transformed = {
        id: msg._id,
        senderId: msg.senderId._id,
        senderName: msg.senderId.name,
        type: msg.imageUrl ? "image" : "text", // Check if imageUrl exists
        content: msg.message,
        imageUrl: msg.imageUrl, // Include imageUrl
        timestamp: msg.createdAt,
        status: "sent",
        isOwn: msg.senderId._id === currentUserId,
      };

      // Debug each message
      if (msg.imageUrl) {
        console.log("Found image message:", transformed);
      }

      return transformed;
    }) || [];

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

  // Handle image send with upload
  const handleSendImage = async (imageUri: string, caption?: string) => {
    if (!socket?.connected) return;

    try {
      // Set loading state
      setIsUploadingState(true);

      // Upload image to server first
      const uploadedImageUrl = await uploadImageToServer(imageUri, uploadImage);

      // Send image via socket with uploaded URL
      socket.emit("sendMessage", {
        chatType: "support",
        supportId,
        imageUrl: uploadedImageUrl,
        message: caption || "",
      });

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Failed to upload and send image:", error);

      // Show error alert
      Alert.alert(
        "Upload Failed",
        "Failed to upload image. Please try again.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      // Reset loading state
      setIsUploadingState(false);
    }
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messages.length]);

  const isLoading = isUploadingImage || isUploadingState;

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
            isUploading={isLoading}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
