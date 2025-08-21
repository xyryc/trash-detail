import { HeaderProps } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ title }: HeaderProps) => {
  const [notification, setNotification] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between py-3">
      <Text style={{ fontFamily: "SourceSans3-Medium" }} className="text-lg">
        {title}
      </Text>

      {notification ? (
        <TouchableOpacity onPress={() => router.push("/shared/notification")}>
          <Image
            source={require("@/assets/images/notification-active.svg")}
            style={{ width: 24, height: 24, padding: 4 }}
            contentFit="contain"
          />
        </TouchableOpacity>
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

export default Header;
