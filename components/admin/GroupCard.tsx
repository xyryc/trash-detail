import { formatRelativeTime } from "@/utils/timeFormat";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const GroupCard = ({ selectedTab, item }) => {
  const router = useRouter();
  // console.log(item?.user?.id, selectedTab);

  return (
    <Pressable
      onPress={() => {
        // if (selectedTab === "problem") {
        router.push(`/admin/chatlist/thread/${selectedTab}/${item?.user?.id}`);
        // } else if (selectedTab === "support") {
        //   router.push(`/admin/chatlist/${selectedTab}/thread/${item?.user?.id}`);
        // }
      }}
      className="border-b border-neutral-light-active"
    >
      {/* Customer Header */}
      <View
        className={`py-4 px-6 flex-row justify-between items-center
          ${item?.incomingMessages > 0 ? "bg-neutral-light" : "bg-white"}
        `}
      >
        <View className="flex-row gap-4 flex-1">
          {/* Customer Avatar */}
          <View className="size-[42px] bg-white rounded-lg border border-neutral-light-hover items-center justify-center">
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-darker capitalize"
            >
              {item?.user?.name?.charAt(0) || "C"}
            </Text>
          </View>

          {/* Customer Info */}
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text
                style={{ fontFamily: "SourceSans3-SemiBold" }}
                className="text-green-normal text-base"
              >
                {item?.user?.userId}
              </Text>

              <Entypo name="dot-single" size={16} color="#667085" />

              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal text-xs"
              >
                {formatRelativeTime(item?.lastMessageTime)}
              </Text>
            </View>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-lg text-neutral-dark-active"
              numberOfLines={1}
            >
              {item?.user?.name}
            </Text>

            <View className="flex-row items-center gap-2 mt-1">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className={`text-xs capitalize ${
                  item?.user?.role === "customer"
                    ? "text-info-normal-hover"
                    : "text-secondary-orange-700"
                }`}
              >
                {item?.user?.role}
              </Text>
            </View>
          </View>
        </View>

        {/* Notification & Expand */}
        <View className="items-end gap-2">
          {item?.incomingMessages > 0 && (
            <View className="size-6 rounded-full overflow-hidden bg-error-normal items-center justify-center">
              <Text
                style={{ fontFamily: "SourceSans3-Bold" }}
                className="text-xs text-white"
              >
                {item?.incomingMessages}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default GroupCard;
