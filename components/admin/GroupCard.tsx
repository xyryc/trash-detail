import { GroupCardProps } from "@/types";
import { formatRelativeTime } from "@/utils/timeFormat";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GroupCard = ({ customerGroup }: GroupCardProps) => {
  const { customer, totalIncomingMessages, latestMessageTime, type, chats } =
    customerGroup;
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        if (type === "problem") {
          router.push({
            pathname: `/admin/chatlist/problem/thread/${customer?.id}`,
            params: {
              customerData: JSON.stringify({
                customer,
                chats,
                totalIncomingMessages,
              }),
            },
          });
        } else if (type === "support") {
          router.push({
            pathname: `/admin/chatlist/support/thread/${customer?.id}`,
            params: {
              customerData: JSON.stringify({
                customer,
                chats,
                totalIncomingMessages,
              }),
            },
          });
        }
      }}
      className="border-b border-neutral-light-active"
    >
      {/* Customer Header */}
      <View
        className={`py-4 px-6 flex-row justify-between items-center
          ${totalIncomingMessages > 0 ? "bg-neutral-light" : "bg-white"}
        `}
      >
        <View className="flex-row gap-4 flex-1">
          {/* Customer Avatar */}
          <View className="size-[42px] bg-white rounded-lg border border-neutral-light-hover items-center justify-center">
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-darker"
            >
              {customer?.name?.charAt(0) || "C"}
            </Text>
          </View>

          {/* Customer Info */}
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text
                style={{ fontFamily: "SourceSans3-SemiBold" }}
                className="text-green-normal text-base"
              >
                {customer?.customerId}
              </Text>

              <Entypo name="dot-single" size={16} color="#667085" />

              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal text-xs"
              >
                {formatRelativeTime(latestMessageTime)}
              </Text>
            </View>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-lg text-neutral-dark-active"
              numberOfLines={1}
            >
              {customer?.name}
            </Text>

            <View className="flex-row items-center gap-2 mt-1">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className={`text-xs capitalize ${
                  customer?.role === "customer"
                    ? "text-info-normal-hover"
                    : "text-secondary-orange-700"
                }`}
              >
                {customer?.role}
              </Text>
            </View>
          </View>
        </View>

        {/* Notification & Expand */}
        <View className="items-end gap-2">
          {totalIncomingMessages > 0 && (
            <View className="size-6 rounded-full overflow-hidden bg-error-normal items-center justify-center">
              <Text
                style={{ fontFamily: "SourceSans3-Bold" }}
                className="text-xs text-white"
              >
                {totalIncomingMessages}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupCard;
