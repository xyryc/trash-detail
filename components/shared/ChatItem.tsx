import { formatRelativeTime } from "@/utils/timeFormat";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

const ChatItem = ({ item, onPress }: any) => {
  console.log(item);

  return (
    <Pressable
      onPress={onPress}
      className={` py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active
            ${item.incomingMessages > 0 && "bg-neutral-light"}
            ${item.status === "closed" && "bg-neutral-light-active"}
        `}
    >
      {/* message content */}
      <View className="flex-row gap-4">
        {item.imageUrl ? (
          <View className="size-[42px] bg-white rounded-lg border border-neutral-light-hover">
            <Image
              source={require("@/assets/images/left-guy.svg")}
              style={{ width: 42, height: 42 }}
              contentFit="scale-down"
            />
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
              {item.problemId || item.supportId}
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
            {item.title}
          </Text>

          {item.status === "closed" ? (
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="mt-1 text-sm text-[#FF0000] capitalize"
              numberOfLines={1}
            >
              {item.status}
            </Text>
          ) : (
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="mt-1 text-xs text-neutral-normal-active"
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
          )}
        </View>
      </View>

      {/* notification  */}
      {item.incomingMessages > 0 && (
        <View className="size-6 rounded-full overflow-hidden">
          <Text
            style={{ fontFamily: "SourceSans3-Bold" }}
            className="text-xs p-1 bg-error-normal text-white text-center"
          >
            {item.incomingMessages}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ChatItem;
