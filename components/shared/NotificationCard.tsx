import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const NotificationCard = ({ className }: any) => {
  return (
    <View
      className={`flex-row gap-3 py-4 px-6 border-b border-green-light ${className}`}
    >
      <AntDesign
        className="p-2 bg-white rounded-lg border border-neutral-light-hover"
        name="questioncircleo"
        size={24}
        color="black"
      />

      <View>
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-neutral-darker"
        >
          ID : P23 || status updates
        </Text>
        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-green-normal"
        >
          Forwarded
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;
