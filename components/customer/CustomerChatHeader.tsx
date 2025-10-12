import { CustomerChatHeaderProps } from "@/types";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProblemDetailsModal from "../shared/ProblemDetailsModal";

const CustomerChatHeader = ({
  id,
  problemId,
  title,
  showProblemDetails,
}: CustomerChatHeaderProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-white p-4 border-[0.5px] border-neutral-light rounded-lg">
      {/* ID Row */}
      {id && (
        <View className="flex-row items-center mb-2">
          <Text
            className="w-1/3 text-neutral-normal"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            ID
          </Text>
          <Text
            className="text-neutral-normal mx-2"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            :
          </Text>
          <Text
            className="flex-1 text-neutral-dark-active"
            style={{ fontFamily: "SourceSans3-SemiBold" }}
          >
            {id}
          </Text>
        </View>
      )}

      {/* Title Row */}
      {title && (
        <View className="flex-row items-center mb-2">
          <Text
            className="w-1/3 text-neutral-normal"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            Title
          </Text>
          <Text
            className="text-neutral-normal mx-2"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            :
          </Text>
          <Text
            className="flex-1 text-neutral-dark-active"
            style={{ fontFamily: "SourceSans3-SemiBold" }}
          >
            {title}
          </Text>
        </View>
      )}

      {/* Separator */}
      {showProblemDetails && (
        <View className="mt-2 h-px bg-neutral-light-hover" />
      )}

      {/* buttons */}
      <View className="mt-2 flex-row items-center justify-between">
        {showProblemDetails && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-sm text-info-normal-active"
            >
              Problem Details
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal */}
      <ProblemDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        problemId={problemId}
      />
    </View>
  );
};

export default CustomerChatHeader;
