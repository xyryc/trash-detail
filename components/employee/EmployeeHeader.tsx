import { useAppSelector } from "@/store/hooks";
import { HeaderProps } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EmployeeHeader = ({ name, email }: HeaderProps) => {
  const [notification, setNotification] = useState(true);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user?.email);

  return (
    <View className="flex-row items-center justify-between py-[5px]">
      <View>
        <Text style={{ fontFamily: "SourceSans3-Medium" }}>
          Hi, {user?.name || "there"}
        </Text>
        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-neutral-normal-hover"
        >
          {user?.email || "Welcome Back"}
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
