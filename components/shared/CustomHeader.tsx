import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const CustomHeader = ({ text = "Details" }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center py-2.5">
      <Pressable onPress={() => router.back()} className="z-10">
        <Feather name="chevron-left" size={24} color="black" />
      </Pressable>

      <Text
        style={{ fontFamily: "SourceSans3-Medium" }}
        className="text-lg absolute left-0 right-0 text-center"
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomHeader;
