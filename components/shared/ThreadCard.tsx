import { formatRelativeTime } from "@/utils/timeFormat";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ThreadCard = ({ item, onPress }: any) => {
  // console.log("thread card------------", item);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active
            ${item.unreadCount > 0 && "bg-neutral-light"}
        `}
    >
      {/* message content */}
      <View className="flex-row gap-4">
        {item.category === "problem" ? (
          <View className="size-[42px] bg-white rounded-lg border border-neutral-light-hover items-center justify-center">
            <Text style={{ fontFamily: "SourceSans3-Medium" }}>S</Text>
          </View>
        ) : (
          <View>
            <AntDesign
              className="p-2 bg-white rounded-lg border border-neutral-light-hover"
              name="question-circle"
              size={24}
              color="black"
            />
          </View>
        )}

        <View className="w-3/4">
          <View className="flex-row items-center">
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-green-normal"
            >
              {item?.customer?.id}
            </Text>

            <Entypo name="dot-single" size={16} color="#667085" />

            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal text-xs"
            >
              {formatRelativeTime(item.lastMessageTime)}
            </Text>
          </View>

          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-lg"
            numberOfLines={1}
          >
            {item?.customer?.name}
          </Text>

          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className={`mt-1 text-xs text-info-normal-hover capitalize 
              ${
                item?.customer?.role === "customer"
                  ? "text-info-normal-hover"
                  : "text-secondary-orange-700"
              }`}
            numberOfLines={1}
          >
            {item?.customer?.role}
          </Text>
        </View>
      </View>

      {/* notification  */}
      {item.unreadCount > 0 && (
        <View className="size-6 rounded-full overflow-hidden">
          <Text
            style={{ fontFamily: "SourceSans3-Bold" }}
            className="text-xs p-1 bg-error-normal text-white text-center"
          >
            {item.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ThreadCard;
