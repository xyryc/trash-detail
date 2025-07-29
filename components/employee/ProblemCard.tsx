import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const ProblemCard = () => {
  return (
    <View className="bg-neutral-light p-2 rounded-lg">
      {/* second */}
      <View className="flex-row">
        {/* first */}
        <View className="w-[38%] flex-row items-center gap-3.5">
          <Image
            source={require("@/assets/images/car.png")}
            style={{ width: 40, height: 40, borderRadius: 6 }}
            contentFit="contain"
          />

          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal-active text-[10px] mb-1"
              numberOfLines={1}
            >
              P- 12
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-neutral-dark-active text-[10px]"
              numberOfLines={1}
            >
              Car Parked
            </Text>
          </View>
        </View>

        {/* second */}
        <View className="w-[41%] flex-row items-center">
          {/* Left Border */}
          <View className="h-[7px] w-[1px] bg-neutral-light-active" />

          {/* Text Content */}
          <View className="px-3.5">
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal-active text-[10px] mb-1"
              numberOfLines={1}
            >
              P- 12
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-neutral-dark-active text-[10px]"
              numberOfLines={1}
            >
              5th Avenue Manhattan, Russia
            </Text>
          </View>
        </View>

        {/* third */}
        <View className="w-[21%] flex-row items-center">
          {/* Left Border */}
          <View className="h-[7px] w-[1px] bg-neutral-light-active" />

          {/* Text Content */}
          <View className="px-3.5">
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal-active text-[10px] mb-1"
              numberOfLines={1}
            >
              Apr 19
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-green-normal text-[10px]"
              numberOfLines={1}
            >
              forwareded
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProblemCard;
