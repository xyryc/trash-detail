import { useGetProblemByIdQuery } from "@/store/slices/customerApiSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface ProblemDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  problemId?: string;
}

const ProblemDetailsModal = ({
  visible,
  onClose,
  problemId,
}: ProblemDetailsModalProps) => {
  const { data: problemData } = useGetProblemByIdQuery(problemId);
  //   console.log(problemData?.data);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[90%] pb-5">
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
            <Text
              className="text-lg text-gray-800"
              style={{ fontFamily: "SourceSans3-SemiBold" }}
            >
              Problem Details
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
            {/* Image */}
            {problemData?.data?.imageUrl && (
              <View className="mt-4">
                <Image
                  source={{ uri: problemData?.data?.imageUrl }}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 6,
                    resizeMode: "cover",
                  }}
                />
              </View>
            )}

            {/* Problem ID */}
            {problemData?.data?.problemId && (
              <View className="mt-4">
                <Text
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "SourceSans3-Medium" }}
                >
                  Problem ID:
                </Text>
                <Text
                  className="text-base text-gray-800 mt-1"
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                >
                  {problemData?.data?.problemId}
                </Text>
              </View>
            )}

            {/* Divider */}
            <View className="h-[1px] bg-neutral-light-hover mt-4" />

            {/* Location */}
            {problemData?.data?.locationName && (
              <View className="mt-4">
                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("@/assets/images/location.svg")}
                    style={{
                      width: 14,
                      height: 14,
                      resizeMode: "contain",
                    }}
                  />

                  <Text
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "SourceSans3-Medium" }}
                  >
                    Location:
                  </Text>
                </View>
                <Text
                  className="text-base text-gray-800 mt-1"
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                >
                  {problemData?.data?.locationName}
                </Text>
              </View>
            )}

            {/* Divider */}
            <View className="h-[1px] bg-neutral-light-hover mt-4" />

            {/* Problem Title */}
            {problemData?.data?.title && (
              <View className="mt-4">
                <Text
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "SourceSans3-Medium" }}
                >
                  Problem Title:
                </Text>
                <Text
                  className="text-base text-gray-800 mt-1"
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                >
                  {problemData?.data?.title}
                </Text>
              </View>
            )}

            {/* Divider */}
            <View className="h-[1px] bg-neutral-light-hover mt-4" />

            {/* Additional Notes */}
            {problemData?.data?.additionalNotes && (
              <View className="mt-4 mb-4">
                <Text
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "SourceSans3-Medium" }}
                >
                  Additional Notes
                </Text>
                <Text
                  className="text-base text-gray-800 mt-1"
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                >
                  {problemData?.data?.additionalNotes}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ProblemDetailsModal;
