import { componentReadyData } from "@/assets/data/messages.json";
import ChatHeader from "@/components/shared/ChatHeader";
import ChatInputSection from "@/components/shared/ChatInputSection";
import CustomHeader from "@/components/shared/CustomHeader";
import RenderMessage from "@/components/shared/RenderMessage";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const [messages, setMessages] = useState(componentReadyData.messages);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const currentUserId = componentReadyData.currentUserId;

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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
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

          <ChatHeader />

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
