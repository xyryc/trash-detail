import { ConnectionStatusProps } from "@/types";
import { Text, View } from "react-native";

const ConnectionStatus = ({ connectionStatus }: ConnectionStatusProps) => {
  if (connectionStatus === "connected") return null;

  return (
    <View className="bg-red-100 px-4 py-2">
      <Text className="text-red-800 text-center text-sm">
        {connectionStatus === "connecting"
          ? "Connecting..."
          : "Offline - Messages will be sent when reconnected"}
      </Text>
    </View>
  );
};

export default ConnectionStatus;
