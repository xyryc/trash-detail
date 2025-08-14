import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, View } from "react-native";

const SupportHeader = () => {
  const [notification, setNotification] = useState(true);

  return (
    <View className="flex-row items-center justify-between">
      <Text style={{ fontFamily: "SourceSans3-Medium" }} className="text-lg">
        Support
      </Text>

      {notification ? (
        <Image
          source={require("@/assets/images/notification-active.svg")}
          style={{ width: 24, height: 24, padding: 4 }}
          contentFit="contain"
        />
      ) : (
        <Image
          source={require("@/assets/images/notification.svg")}
          style={{ width: 24, height: 24, padding: 4 }}
          contentFit="contain"
        />
      )}
    </View>
  );
};

export default SupportHeader;
