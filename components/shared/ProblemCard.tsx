import { useGetLoggedInUserDataQuery } from "@/store/slices/authApiSlice";
import { ProblemItem } from "@/types";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

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

  const router = useRouter();

  const { data: userData } = useGetLoggedInUserDataQuery();

  return (
    <View className="bg-neutral-light p-2 rounded-lg">
      {/* top row */}
      <View className="flex-row">
        {/* first - problem */}
        <View className="w-[18%]">
          <Image
            source={imageUrl}
            style={{ width: 40, height: 40, borderRadius: 6 }}
            contentFit="fill"
          />
        </View>

        {/* second - title */}
        <View className="w-[20%] pr-2.5 justify-center">
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

        {/* third - customer */}
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

        {/* fourth - status */}
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
              {format(new Date(reportedDate), "MMMM d")}
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
              numberOfLines={1}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>

      {/* bottom row */}
      {status === "cancelled" && userData?.data?.role !== "admin" && (
        <View className="px-2 py-0.5 bg-info-light border border-info-light-active rounded-[2px] mt-2 flex-row gap-1">
          <Text
            style={{ fontFamily: "SourceSans3-Regular" }}
            className="text-xs text-info-normal"
          >
            To resolve the matter, please contact
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(employee)/profile/support/start")}
          >
            <Text
              style={{ fontFamily: "SourceSans3-Bold" }}
              className="text-info-normal-active text-xs"
            >
              support.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProblemCard;
