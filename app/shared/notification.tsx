import CustomHeader from "@/components/shared/CustomHeader";
import NotificationCard from "@/components/shared/NotificationCard";
import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6">
        <CustomHeader text="Notification" />
      </View>

      <ScrollView>
        <NotificationCard />

        <NotificationCard className="bg-neutral-light" />

        <NotificationCard />

        <NotificationCard />

        <NotificationCard className="bg-neutral-light" />

        <NotificationCard />

        <NotificationCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
