// NotificationCard.tsx
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface NotificationCardProps {
  notification: {
    _id: string;
    message: string;
    problemId: string;
    read: boolean;
    type: string;
    createdAt: string;
  };
  className?: string;
}

const NotificationCard = ({
  notification,
  className,
}: NotificationCardProps) => {
  // Extract problem number from message (e.g., "#P39")
  const problemMatch = notification.message.match(/#(P\d+)/);
  const problemNumber = problemMatch ? problemMatch[1] : "N/A";

  // Extract status from message (e.g., "forwarded")
  const statusMatch = notification.message.match(/updated to (\w+)/);
  const status = statusMatch ? statusMatch[1] : "Updated";

  return (
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
          ID : {problemNumber} || status updates
        </Text>
        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-green-normal capitalize"
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;
