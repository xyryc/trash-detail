import { NotificationCardProps } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const NotificationCard = ({
  notification,
  className,
  onPress, // Now it's in the interface
}: NotificationCardProps) => {
  const extractId = () => {
    if (notification.id) {
      return notification.id;
    }
    const match = notification.message.match(/#([PS]\d+)/);
    return match ? match[1] : "N/A";
  };

  const extractStatus = () => {
    const statusMatch = notification.message.match(/updated to (\w+)/i);
    if (statusMatch) {
      return statusMatch[1];
    }

    if (notification.type === "new_support") {
      return "New Support";
    }
    if (notification.type === "new_problem") {
      return "New Problem";
    }

    return "Updated";
  };

  const problemId = extractId();
  const status = extractStatus();

  return (
    <Pressable onPress={onPress}>
      <View
        className={`flex-row gap-3 py-4 px-6 border-b border-green-light ${className || ""}`}
      >
        <AntDesign
          className="p-2 bg-white rounded-lg border border-neutral-light-hover"
          name="question-circle"
          size={24}
          color="black"
        />

        <View>
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-neutral-darker"
          >
            ID : {problemId} || status updates
          </Text>
          <Text
            style={{ fontFamily: "SourceSans3-Regular" }}
            className="text-green-normal capitalize"
          >
            {status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationCard;
