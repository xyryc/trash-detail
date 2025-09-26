import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RenderMessage = ({ item, currentUserId }: any) => {
  console.log("item", item);
  // Determine if message is own based on senderId or isOwn field
  const isOwnMessage = item.isOwn || item.senderId === currentUserId;

  // Helper functions
  const formatTime = (timestamp: any) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatFileSize = (bytes: any) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownloadImage = (imageUrl: any) => {
    console.log("Download image:", imageUrl);
    // Implement image download logic
  };

  const handleDownloadFile = (fileUrl: any) => {
    console.log("Download file:", fileUrl);
    // Implement file download logic
  };

  return (
    <View className={`mb-2 ${isOwnMessage ? "items-end" : "items-start"}`}>
      {/* Text Message */}
      {item.type === "text" && (
        <View>
          <View
            className={`max-w-xs px-3 py-2 ${
              isOwnMessage
                ? "bg-green-normal rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                : "bg-green-light rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
            }`}
          >
            <Text
              className={`text-sm ${isOwnMessage ? "text-white" : "text-[#595959]"}`}
              style={{ fontFamily: "SourceSans3-Regular" }}
            >
              {item.content}
            </Text>
          </View>

          {/* Timestamp */}
          <Text
            className={`text-[10px] mt-2 text-[#333333CC] ${
              isOwnMessage ? "text-right" : "text-left"
            }`}
            style={{ fontFamily: "SourceSans3-SemiBold" }}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      )}

      {/* Image Message */}
      {item.type === "image" && (
        <View
          className={`max-w-xs ${isOwnMessage ? "items-end" : "items-start"}`}
        >
          <View
            className={`relative ${
              isOwnMessage
                ? "bg-green-normal rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                : "bg-green-light rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
            } overflow-hidden`}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 250, height: 180 }}
              contentFit="cover"
            />

            {/* Download button overlay */}
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
              onPress={() => handleDownloadImage(item.imageUrl)}
            >
              <Feather name="download" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Timestamp */}
          <Text
            className={`text-[10px] mt-2 text-[#333333CC] ${
              isOwnMessage ? "text-right" : "text-left"
            }`}
            style={{ fontFamily: "SourceSans3-SemiBold" }}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default RenderMessage;
