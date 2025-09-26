import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatInputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  onSendImage: (imageUri: string, caption?: string) => void;
  isUploading?: boolean;
  disabled?: boolean;
}

const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  inputText,
  setInputText,
  onSendMessage,
  onSendImage,
  isUploading = false,
  disabled = false,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  // Handle text change
  const handleTextChange = (text: string) => {
    if (disabled) return; // Prevent typing when disabled

    setInputText(text);

    // Typing indicator logic
    if (text.length > 0 && !isTyping) {
      setIsTyping(true);
      // Send typing start event to socket
    } else if (text.length === 0 && isTyping) {
      setIsTyping(false);
      // Send typing stop event to socket
    }
  };

  // Handle send button press
  const handleSend = () => {
    if (disabled || isUploading || !inputText.trim()) return;

    onSendMessage();
    setIsTyping(false);
    Keyboard.dismiss();
  };

  // Handle camera/gallery selection
  const handleImagePicker = () => {
    if (disabled || isUploading) return;

    Alert.alert("Select Image", "Choose an option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "Camera permission is needed to take photos"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onSendImage(result.assets[0].uri, "");
    }
  };

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "Gallery permission is needed to select photos"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onSendImage(result.assets[0].uri, "");
    }
  };

  return (
    <View className="bg-[#F8FAF8] py-2">
      {/* Upload Progress Indicator */}
      {isUploading && (
        <View className="flex-row items-center justify-center py-3 px-6">
          <ActivityIndicator size="small" color="#22c55e" />
          <Text
            className="ml-2 text-sm text-gray-600"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            Uploading image...
          </Text>
        </View>
      )}

      {/* Main Input Row */}
      <View className="flex-row items-center px-6 gap-2">
        {/* Attachment Button */}
        <TouchableOpacity
          onPress={handleImagePicker}
          disabled={disabled || isUploading}
          className={`items-center justify-center rounded-full p-4 ${
            disabled || isUploading
              ? "bg-gray-300 opacity-50"
              : "bg-green-light"
          }`}
        >
          <Image
            source={require("@/assets/images/file.svg")}
            style={{
              width: 24,
              height: 24,
              opacity: disabled || isUploading ? 0.5 : 1,
            }}
          />
        </TouchableOpacity>

        {/* Text Input Container */}
        <View
          className={`flex-1 max-h-24 rounded-lg ${
            disabled || isUploading ? "bg-gray-200" : "bg-green-light"
          }`}
        >
          <TextInput
            className={`py-4 text-base px-3 ${
              disabled || isUploading ? "text-gray-400" : "text-black"
            }`}
            style={{
              fontFamily: "SourceSans3-Regular",
              textAlignVertical: "center",
            }}
            placeholder={
              isUploading
                ? "Uploading..."
                : disabled
                  ? "Processing..."
                  : "Type your message..."
            }
            placeholderTextColor={
              disabled || isUploading ? "#9ca3af" : "#5c6578"
            }
            value={inputText}
            onChangeText={handleTextChange}
            multiline={true}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
            editable={!disabled && !isUploading}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSend}
          disabled={disabled || isUploading || !inputText.trim()}
          className={`absolute right-9 top-[15%] p-2 rounded-lg items-center justify-center ${
            disabled || isUploading || !inputText.trim()
              ? "bg-green-normal-hover"
              : inputText.trim()
                ? "bg-green-normal-hover"
                : "bg-green-normal"
          }`}
        >
          {isUploading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Image
              source={require("@/assets/images/send.svg")}
              style={{
                width: 24,
                height: 24,
                opacity: disabled || !inputText.trim() ? 0.5 : 1,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Bottom safe area for iPhone */}
      {/* {Platform.OS === "ios" && <View className="h-6" />} */}
    </View>
  );
};

export default ChatInputSection;
