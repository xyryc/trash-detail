import ChatHeader from "@/components/shared/ChatHeader";
import CustomHeader from "@/components/shared/CustomHeader";
import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        {/* header */}
        <View className="px-6">
          <CustomHeader text="Chat" />
        </View>

        <ChatHeader />

        {/* main content */}
        <ScrollView
          contentContainerClassName="border-[0.5px] border-neutral-light p-4 rounded-lg"
          showsVerticalScrollIndicator={false}
        ></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
