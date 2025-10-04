import { TypingIndicatorProps } from "@/types";
import { Text, View } from "react-native";

const TypingIndicator = ({ typingUsers }: TypingIndicatorProps) => {
  if (typingUsers?.length === 0) return null;

  return (
    <View className="px-6 py-2">
      <Text className="text-gray-500 text-sm italic">User is typing...</Text>
    </View>
  );
};

export default TypingIndicator;
