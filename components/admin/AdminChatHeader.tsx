import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProblemDetailsModal from "../shared/ProblemDetailsModal";

const AdminChatHeader = ({
  id,
  problemId,
  name,
  number,
  status,
  showProblemDetails = false,
  handleCloseProblem,
  handleCloseSupport,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("header", id, name, number);

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
      {(showProblemDetails || handleCloseProblem) && (
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

        {handleCloseProblem &&
          (status === "closed" ? (
            <View className="flex-1 items-end">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-sm text-error-normal"
              >
                Closed Support
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleCloseProblem}>
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-sm text-error-normal"
              >
                Close Problem
              </Text>
            </TouchableOpacity>
          ))}

        {handleCloseSupport &&
          (status === "closed" ? (
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

export default AdminChatHeader;
