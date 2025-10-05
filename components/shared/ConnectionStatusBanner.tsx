import { useSocket } from "@/hooks/useSocket";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ConnectionStatusBanner = () => {
  const { socket, connectionStatus } = useSocket();

  const handleRetryConnection = useCallback(() => {
    socket?.connect();
  }, [socket]);

  if (connectionStatus === "connected") return null;

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case "connecting":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          icon: "wifi" as const,
          message: "Connecting to server...",
          showRetry: false,
        };
      case "error":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          icon: "error" as const,
          message: "Connection failed. Real-time updates disabled.",
          showRetry: true,
        };
      case "disconnected":
        return {
          bgColor: "bg-orange-100",
          textColor: "text-orange-800",
          icon: "wifi-off" as const,
          message: "Disconnected. Real-time updates paused.",
          showRetry: true,
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <View
      className={`${config.bgColor} px-4 py-3 mx-4 mb-2 rounded-lg flex-row items-center justify-between`}
    >
      <View className="flex-row items-center flex-1">
        <MaterialIcons
          name={config.icon}
          size={16}
          color={
            config.textColor.includes("red")
              ? "#991b1b"
              : config.textColor.includes("yellow")
                ? "#92400e"
                : "#9a3412"
          }
        />
        <Text className={`ml-2 text-sm ${config.textColor} flex-1`}>
          {config.message}
        </Text>
      </View>

      {config.showRetry && (
        <TouchableOpacity
          onPress={handleRetryConnection}
          className="ml-2 px-3 py-1 bg-white rounded-md border border-gray-300"
        >
          <Text className="text-xs text-gray-700">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ConnectionStatusBanner;
