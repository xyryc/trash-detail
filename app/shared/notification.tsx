import Header from "@/components/shared/Header";
import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6">
        <Header title="Notification" />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
