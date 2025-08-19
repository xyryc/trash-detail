import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "cancel" | "warning" | "info" | "success";
}

const ConfirmationModal = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-500",
  onConfirm,
  onCancel,
  type = "warning",
}: ConfirmationModalProps) => {
  const getIcon = () => {
    switch (type) {
      case "cancel":
        return <Ionicons name="trash" size={48} color="#EF4444" />;
      case "warning":
        return <Ionicons name="warning" size={48} color="#F59E0B" />;
      case "info":
        return <Ionicons name="information-circle" size={48} color="#3B82F6" />;
      case "success":
        return <Ionicons name="checkmark-circle" size={48} color="#10B981" />;
      default:
        return <Ionicons name="help-circle" size={48} color="#6B7280" />;
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case "cancel":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      default:
        return confirmColor;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Backdrop */}
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-6"
        onPress={onCancel}
      >
        {/* Modal Content */}
        <Pressable
          className="bg-white rounded-2xl p-6 w-full max-w-sm"
          onPress={() => {}} // Prevent backdrop press
        >
          {/* Icon */}
          <View className="items-center mb-4">{getIcon()}</View>

          {/* Title */}
          <Text
            className="text-xl font-bold text-center text-gray-900 mb-3"
            style={{ fontFamily: "SourceSans3-Bold" }}
          >
            {title}
          </Text>

          {/* Message */}
          <Text
            className="text-base text-center text-gray-600 mb-6 leading-6"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            {message}
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 py-3 bg-gray-200 rounded-lg"
            >
              <Text
                className="text-center font-semibold text-gray-700"
                style={{ fontFamily: "SourceSans3-SemiBold" }}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className={`flex-1 py-3 ${getConfirmButtonColor()} rounded-lg`}
            >
              <Text
                className="text-center font-semibold text-white"
                style={{ fontFamily: "SourceSans3-SemiBold" }}
              >
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ConfirmationModal;
