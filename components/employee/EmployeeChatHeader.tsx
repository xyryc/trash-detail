import React from "react";
import { Text, View } from "react-native";

const EmployeeChatHeader = ({ id, title }) => {
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
          {id}
        </Text>
      </View>

      {/* title Row */}

      <View className="flex-row items-center mb-2">
        <Text
          className="w-1/3 text-neutral-normal"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          Title
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
          {title}
        </Text>
      </View>
    </View>
  );
};

export default EmployeeChatHeader;
