import { ThreadHeaderProps } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const ThreadHeader = ({ customer }: ThreadHeaderProps) => {
  return (
    <View className="bg-white p-4 border-[0.5px] border-neutral-light rounded-lg">
      {/* ID Row */}
      <View className="flex-row items-center mb-2">
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
          className="flex-1 text-neutral-dark-active"
          style={{ fontFamily: "SourceSans3-SemiBold" }}
        >
          {customer?.customerId}
        </Text>
      </View>

      {/* name Row */}
      <View className="flex-row items-center mb-2">
        <Text
          className="w-1/3 text-neutral-normal"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          Name
        </Text>
        <Text
          className="text-neutral-normal mx-2"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          :
        </Text>
        <Text
          className="flex-1 text-neutral-dark-active"
          style={{ fontFamily: "SourceSans3-SemiBold" }}
        >
          {customer?.name}
        </Text>
      </View>

      {/* Title Row */}
      <View className="flex-row items-center">
        <Text
          className="w-1/3 text-neutral-normal"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          Number
        </Text>
        <Text
          className="text-neutral-normal mx-2"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          :
        </Text>
        <Text
          className="flex-1 text-neutral-dark-active"
          style={{ fontFamily: "SourceSans3-SemiBold" }}
        >
          {customer?.customerNumber}
        </Text>
      </View>
    </View>
  );
};

export default ThreadHeader;
