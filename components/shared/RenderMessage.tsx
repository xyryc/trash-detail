import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RenderMessageProps {
  item: {
    type: string;
    message: string;
    imageUrl?: string;
    timestamp: string;
    isOwn?: boolean;
    senderId: string;
  };
  currentUserId?: string;
}

const RenderMessage: React.FC<RenderMessageProps> = ({
  item,
  currentUserId,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Determine if message is own based on senderId or isOwn field
  const isOwnMessage = item.isOwn || item.senderId === currentUserId;

  // Helper functions
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDownloadImage = async (imageUrl: string) => {
    if (!imageUrl) {
      Alert.alert("Error", "No image URL provided");
      return;
    }

    try {
      setIsDownloading(true);

      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant media library permissions to download images"
        );
        setIsDownloading(false);
        return;
      }

      // Get file extension from URL
      const fileExtension = imageUrl.split(".").pop()?.split("?")[0] || "jpg";
      const fileName = `image_${Date.now()}.${fileExtension}`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Download the image
      const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

      if (downloadResult.status !== 200) {
        throw new Error("Download failed");
      }

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);

      // Optionally create an album
      if (Platform.OS === "android") {
        const album = await MediaLibrary.getAlbumAsync("Downloads");
        if (album == null) {
          await MediaLibrary.createAlbumAsync("Downloads", asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      }

      Alert.alert("Success", "Image saved to gallery", [{ text: "OK" }]);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert(
        "Download Failed",
        "Failed to download image. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsDownloading(false);
    }
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
              {item.message}
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
      {item.type === "image" && item.imageUrl && (
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
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isDownloading ? "bg-black/70" : "bg-black/50"
              }`}
              onPress={() => handleDownloadImage(item.imageUrl!)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator size={16} color="white" />
              ) : (
                <Feather name="download" size={16} color="white" />
              )}
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
