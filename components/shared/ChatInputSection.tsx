import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatInputSection = ({
  inputText,
  setInputText,
  onSendMessage,
  onSendImage,
}: any) => {
  const [isTyping, setIsTyping] = useState(false);

  // Handle text change
  const handleTextChange = (text: any) => {
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
    if (inputText.trim()) {
      onSendMessage();
      setIsTyping(false);
      Keyboard.dismiss();
    }
  };

  // Handle camera/gallery selection
  const handleImagePicker = () => {
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
      {/* Main Input Row */}
      <View className="flex-row items-center px-6 gap-2">
        {/* Attachment Button */}
        <TouchableOpacity
          onPress={handleImagePicker}
          className="items-center justify-center bg-green-light rounded-full p-4"
        >
          <Image
            source={require("@/assets/images/file.svg")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        {/* Text Input Container */}
        <View className="flex-1 max-h-24 bg-green-light rounded-lg">
          <TextInput
            className="py-4 text-base px-3"
            style={{
              fontFamily: "SourceSans3-Regular",
              textAlignVertical: "center",
            }}
            placeholder="Type your message..."
            placeholderTextColor="#5c6578"
            value={inputText}
            onChangeText={handleTextChange}
            multiline={true}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSend}
          disabled={!inputText.trim()}
          className={`absolute right-9 top-[15%] p-2 rounded-lg items-center justify-center ${
            inputText.trim() ? "bg-green-normal-hover" : "bg-green-normal"
          }`}
        >
          <Image
            source={require("@/assets/images/send.svg")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom safe area for iPhone */}
      {/* {Platform.OS === "ios" && <View className="h-6" />} */}
    </View>
  );
};

export default ChatInputSection;
