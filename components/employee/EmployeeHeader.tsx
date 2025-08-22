import { HeaderProps } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EmployeeHeader = ({ name, email }: HeaderProps) => {
  const [notification, setNotification] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between py-[5px]">
      <View>
        <Text style={{ fontFamily: "SourceSans3-Medium" }}>Hi, {name}</Text>
        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-neutral-normal-hover"
        >
          {email}
        </Text>
      </View>

      {notification ? (
        <TouchableOpacity onPress={() => router.push("/shared/notification")}>
          <Image
            source={require("@/assets/images/notification-active.svg")}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
        </TouchableOpacity>
      ) : (
        <Image
          source={require("@/assets/images/notification.svg")}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
        />
      )}
    </View>
  );
};

export default EmployeeHeader;
