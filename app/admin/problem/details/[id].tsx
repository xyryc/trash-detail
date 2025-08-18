import problems from "@/assets/data/problems.json";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import CustomHeader from "@/components/shared/CustomHeader";
import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProblemDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const problem = problems.find(
    (item) => item.id?.toString() === id?.toString()
  );

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader />

        {/* main content */}
        <ScrollView
          className="py-4"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <Image
            className="rounded-md"
            source={problem?.image}
            style={{ width: "100%", height: 326, borderRadius: 6 }}
            contentFit="fill"
          />

          <View className="border border-neutral-light-hover p-4 rounded-lg mt-6">
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-secondary-orange-600 mb-5 capitalize"
            >
              {problem?.status}
            </Text>

            {/* first row */}
            <View className="flex-row ">
              <View className="w-[60vw]">
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Problem ID:
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {problem?.problemCode}
                </Text>
              </View>

              <View>
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Customer ID:
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {problem?.customerCode}
                </Text>
              </View>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* second row */}
            <View className="flex-row ">
              <View className="w-[60vw]">
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Problem Title:
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {problem?.problemStatus}
                </Text>
              </View>

              <View>
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Date Reported:
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {problem?.date}
                </Text>
              </View>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* third row */}
            <View>
              <Text
                style={{ fontFamily: "SourceSans3-Regular" }}
                className="text-neutral-normal mb-2"
              >
                <Octicons name="location" size={16} color="black" /> Location:
              </Text>
              <Text
                style={{ fontFamily: "SourceSans3-SemiBold" }}
                className="text-neutral-dark-active"
              >
                {problem?.location}
              </Text>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* fourth row */}
            <View className="mb-5">
              <Text
                style={{ fontFamily: "SourceSans3-Regular" }}
                className="text-neutral-normal mb-2"
              >
                Additional Notes:
              </Text>
              <Text
                style={{ fontFamily: "SourceSans3-SemiBold" }}
                className="text-neutral-dark-active"
              >
                {problem?.additionalNote}
              </Text>
            </View>

            {/* edit */}
            <ButtonSecondary
              onPress={() => {
                router.push(`/employee/problem/details/edit/${id}`);
              }}
              title="Edit"
              icon={<Octicons name="pencil" size={24} color="#2E323C" />}
            />

            {/* contact */}
            <View className="flex-row gap-5 pt-5">
              <ButtonPrimary
                title="Cancel"
                className="!bg-error-normal w-[48%]"
              />

              <ButtonPrimary title="Forward" className="w-[48%]" />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProblemDetailsScreen;
