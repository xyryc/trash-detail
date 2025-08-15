import React from "react";
import { Text, View } from "react-native";

const ChatHeader = () => {
  return (
    <View className="bg-white p-4">
      {/* ID Row */}
      <View className="flex-row items-center mb-3">
        <Text
          className="w-1/3 text-neutral-normal"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          ID
        </Text>
        <Text
          className="text-neutral-normal mx-2"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          :
        </Text>
        <Text
          className="flex-1 text-gray-900"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          S45
        </Text>
      </View>

      {/* Title Row */}
      <View className="flex-row items-center mb-4">
        <Text className="w-1/3 text-neutral-normal">Title</Text>
        <Text className="text-gray-600 mx-3">:</Text>
        <Text className="flex-1 text-gray-900">Car blocked</Text>
      </View>

      {/* Separator */}
      <View className="h-px bg-neutral-light-hover" />
    </View>
  );
};

export default ChatHeader;
