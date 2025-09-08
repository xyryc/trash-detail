import { HeaderProps } from "@/types";
import { EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ title, openSidebar }: HeaderProps) => {
  const [notification, setNotification] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between py-3">
      <TouchableOpacity
        onPress={openSidebar}
        className="flex-row items-center gap-2"
      >
        {openSidebar && <EvilIcons name="navicon" size={24} color="black" />}
        <Text style={{ fontFamily: "SourceSans3-Medium" }} className="text-lg">
          {title}
        </Text>
      </TouchableOpacity>

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
