import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import CustomHeader from "@/components/shared/CustomHeader";
import {
  useGetProblemByIdQuery,
  useUpdateProblemStatusMutation,
} from "@/store/slices/adminApiSlice";
import { toast } from "@baronha/ting";
import { Octicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProblemDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showForwardAgainModal, setShowForwardAgainModal] = useState(false);

  const { data, isLoading } = useGetProblemByIdQuery(id);
  const problem = data?.data;

  const [updateProblemStatus, { isLoading: isUpdating }] =
    useUpdateProblemStatusMutation();

  const handleUpdateProblemStatus = async (status: any) => {
    const payload = { status };

    try {
      const result = await updateProblemStatus({
        problemId: id,
        payload,
      }).unwrap();

      if (result.success) {
        toast({
          title: "Success",
          message: "Problem status updated successfully",
          preset: "done",
          haptic: "success",
          backgroundColor: "#1F2937",
          titleColor: "#FFFFFF",
          messageColor: "#E5E7EB",
        });
        router.back();
      }
    } catch (error: any) {
      toast({
        title: "Status Update Failed",
        message: error.data?.message || "Something went wrong",
        preset: "error",
        haptic: "error",
        backgroundColor: "#1F2937",
        titleColor: "#FFFFFF",
        messageColor: "#E5E7EB",
      });
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        <CustomHeader />

        {isLoading || isUpdating ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="small" color="#E2F2E5" />
          </View>
        ) : (
          <>
            <ScrollView
              className="py-4"
              contentContainerClassName="pb-10"
              showsVerticalScrollIndicator={false}
            >
              <Image
                className="rounded-md"
                source={problem?.imageUrl}
                style={{ width: "100%", height: 326, borderRadius: 6 }}
                contentFit="fill"
              />

              <View className="border border-neutral-light-hover p-4 rounded-lg mt-6">
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className={`mb-5 capitalize ${
                    (problem?.status === "pending" &&
                      "text-secondary-orange-600") ||
                    (problem?.status === "cancelled" && "text-error-normal") ||
                    (problem?.status === "forwarded" && "text-green-normal")
                  }`}
                >
                  {problem?.status}
                </Text>

                <View className="flex-row">
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

                <View className="h-px bg-neutral-light-hover my-5" />

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
                      {format(new Date(problem?.reportedDate), "MMMM d, yyyy")}
                    </Text>
                  </View>
                </View>

                <View className="h-px bg-neutral-light-hover my-5" />

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

                <View className="h-px bg-neutral-light-hover my-5" />

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

                <ButtonSecondary
                  onPress={() => {
                    router.push(`/(admin)/problem/details/edit/${problem._id}`);
                  }}
                  title="Edit"
                  icon={<Octicons name="pencil" size={24} color="#2E323C" />}
                />

                <View className="flex-row gap-5 pt-5">
                  {problem?.status === "forwarded" ? (
                    <ButtonPrimary
                      onPress={() => router.push("/(admin)/(tabs)/chatlist")}
                      title="Open chat"
                      className="w-full"
                    />
                  ) : (
                    <>
                      <ButtonPrimary
                        onPress={() => setShowCancelModal(true)}
                        title={
                          problem?.status === "cancelled" ? "Cancelled" : "Cancel"
                        }
                        className={`${problem?.status === "cancelled" ? "!bg-error-light-active" : "!bg-error-normal"} w-[48%]`}
                        disabled={problem?.status === "cancelled"}
                      />

                      <ButtonPrimary
                        onPress={() => {
                          if (problem?.status === "cancelled") {
                            setShowForwardAgainModal(true);
                          } else {
                            setShowForwardModal(true);
                          }
                        }}
                        title={
                          problem?.status === "cancelled"
                            ? "Forward Again"
                            : "Forward"
                        }
                        className="w-[48%]"
                      />
                    </>
                  )}
                </View>
              </View>
            </ScrollView>

            <ConfirmationModal
              visible={showCancelModal}
              title="Cancel Problem"
              message="Are you sure?"
              type="cancel"
              onConfirm={() => {
                handleUpdateProblemStatus("cancelled");
                setShowCancelModal(false);
              }}
              onCancel={() => setShowCancelModal(false)}
            />

            <ConfirmationModal
              visible={showForwardModal}
              title="Forward Problem"
              message="Are you sure?"
              type="warning"
              onConfirm={() => {
                handleUpdateProblemStatus("forwarded");
                setShowForwardModal(false);
              }}
              onCancel={() => setShowForwardModal(false)}
            />

            <ConfirmationModal
              visible={showForwardAgainModal}
              title="Forward Problem Again"
              message="Are you sure?"
              type="warning"
              onConfirm={() => {
                handleUpdateProblemStatus("forwarded");
                setShowForwardAgainModal(false);
              }}
              onCancel={() => setShowForwardAgainModal(false)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProblemDetailsScreen;


