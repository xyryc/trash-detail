import { useAppSelector } from "@/store/hooks";
import { ChatHeaderProps } from "@/types";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProblemDetailsModal from "./ProblemDetailsModal";

const ChatHeader = ({
  id,
  problemId,
  title,
  name,
  number,
  supportStatus,
  handleCloseSupport,
  handleCloseProblem,
  type, // Use type instead of individual boolean props
}: ChatHeaderProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Determine which buttons to show based on type
  const showProblemDetails = type === "problem";
  const showCloseProblem = type === "problem";
  const showCloseSupport = type === "support";

  const user = useAppSelector((state) => state.auth.user);

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

      {/* name Row */}
      {name && (
        <View className="flex-row items-center mb-2">
          <Text
            className="w-1/3 text-neutral-normal"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            Name
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
            {name}
          </Text>
        </View>
      )}

      {/* name Row */}
      {number && (
        <View className="flex-row items-center mb-2">
          <Text
            className="w-1/3 text-neutral-normal"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            Number
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
            {number}
          </Text>
        </View>
      )}

      {/* Separator */}
      {(showProblemDetails || showCloseProblem || showCloseSupport) && (
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

        {user?.role === "admin" && showCloseProblem && (
          <TouchableOpacity onPress={handleCloseProblem}>
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-sm text-error-normal"
            >
              Close Problem
            </Text>
          </TouchableOpacity>
        )}

        {showCloseSupport &&
          (supportStatus === "closed" ? (
            <View className="flex-1 items-end">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-sm text-error-normal"
              >
                Closed Support
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleCloseSupport}
              className="flex-1 items-end"
            >
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-sm text-error-normal"
              >
                Close Support
              </Text>
            </TouchableOpacity>
          ))}
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

export default ChatHeader;
