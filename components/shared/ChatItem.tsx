import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const ChatItem = ({ item }: any) => {
  return (
    <View
      className={` py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active
            ${item.unreadCount > 0 && "bg-neutral-light"}
            ${item.status === "closed" && "bg-neutral-light-active"}
        `}
    >
      {/* message content */}
      <View className="flex-row gap-4">
        {item.category === "problem" ? (
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
              name="questioncircleo"
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
              {item.problemId}
            </Text>

            <Entypo name="dot-single" size={16} color="#667085" />

            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal text-xs"
            >
              {item.timestamp}
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
              {item.description}
            </Text>
          )}
        </View>
      </View>

      {/* notification  */}
      <View className="size-6 rounded-full overflow-hidden">
        <Text
          style={{ fontFamily: "SourceSans3-Bold" }}
          className="text-xs p-1 bg-error-normal text-white text-center"
        >
          {item.unreadCount}
        </Text>
      </View>
    </View>
  );
};

export default ChatItem;
