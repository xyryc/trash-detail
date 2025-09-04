import { ProblemItem } from "@/types";
import { Image } from "expo-image";
import { Text, View } from "react-native";

const ProblemCard = ({ data }: { data: ProblemItem }) => {
  const {
    customerId,
    imageUrl,
    locationName,
    problemId,
    reportedDate,
    status,
    title,
  } = data;

  return (
    <View className="bg-neutral-light p-2 rounded-lg">
      <View className="flex-row">
        {/* first - problem */}
        <View className="w-[38%] flex-row items-center gap-3.5">
          <Image
            source={imageUrl}
            style={{ width: 40, height: 40, borderRadius: 6 }}
            contentFit="fill"
          />

          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal-active text-[10px] mb-1"
              numberOfLines={1}
            >
              {problemId}
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-neutral-dark-active text-[10px]"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>

        {/* second - customer */}
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
              {customerId}
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className="text-neutral-dark-active text-[10px]"
              numberOfLines={1}
            >
              {locationName}
            </Text>
          </View>
        </View>

        {/* third - status */}
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
              {reportedDate}
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-SemiBold" }}
              className={`text-[10px] capitalize
                  ${
                    (status === "pending" && "text-secondary-orange-600") ||
                    (status === "cancelled" && "text-error-normal") ||
                    (status === "forwarded" && "text-[#237B10]")
                  }
                `}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProblemCard;
