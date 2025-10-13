import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useGetProblemByIdQuery } from "@/store/slices/employeeApiSlice";
import { Octicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProblemDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetProblemByIdQuery(id);
  const problem = data?.data;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#E2F2E5" />
      </SafeAreaView>
    );
  }

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
            source={problem?.imageUrl}
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
              <View className="w-[50vw]">
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
                  {problem?.problemId}
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
                  {problem?.customerId}
                </Text>
              </View>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* second row */}
            <View className="flex-row ">
              <View className="w-[50vw]">
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
                  {problem?.title}
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
                  {format(new Date(problem.createdAt), "MMMM d, yyyy")}
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
                {problem?.locationName}
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
                {problem?.additionalNotes}
              </Text>
            </View>

            {/* edit */}
            <ButtonSecondary
              onPress={() => {
                router.push(`/employee/problem/details/edit/${problem._id}`);
              }}
              title="Edit"
              icon={<Octicons name="pencil" size={24} color="#2E323C" />}
              className="mb-5"
            />

            {/* warning */}
            {problem.status === "cancelled" && (
              <View className="flex-row gap-1 bg-info-light p-2 mb-5">
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-info-normal-active rounded-lg"
                >
                  To resolve the matter, please contact
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/employee/profile/support/start")}
                >
                  <Text
                    style={{ fontFamily: "SourceSans3-Bold" }}
                    className="text-info-normal-active"
                  >
                    support.
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* contact */}
            <ButtonPrimary
              onPress={() => router.push("/employee/profile/support/start")}
              title="Contact with Support"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProblemDetailsScreen;
