import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import {
  useGetProblemByIdQuery,
  useUpdateProblemMutation,
} from "@/store/slices/adminApiSlice";
import { toast } from "@baronha/ting";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProblemScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetProblemByIdQuery(id);
  const problem = data?.data;
  const [updateProblem, { isLoading: isUpdating }] = useUpdateProblemMutation();

  const [charCount, setCharCount] = useState(0);
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    if (!problem) return;
    setTitle(problem.title || "");
    setLocationName(problem.locationName || "");
    setAdditionalNotes(problem.additionalNotes || "");
    setCharCount((problem.title || "").length);
  }, [problem]);

  const handleUpdateProblem = async () => {
    const payload = {
      title,
      locationName,
      additionalNotes,
    };

    try {
      const response = await updateProblem({
        problemId: id,
        payload,
      }).unwrap();

      if (response.success) {
        toast({
          title: "Success",
          message: "Problem details updated successfully",
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
        title: "Error",
        message: error.data?.message || "Failed to update problem details",
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 px-6">
          <CustomHeader text="Edit" />

          {isLoading || isUpdating ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="small" color="#E2F2E5" />
            </View>
          ) : (
            <ScrollView
              className="py-4"
              contentContainerClassName="pb-10"
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={problem?.image}
                style={{ width: "100%", height: 326, borderRadius: 6 }}
                contentFit="fill"
              />

              <View className="border border-neutral-light-hover p-4 rounded-lg mt-6">
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="mb-5 text-secondary-orange-600 capitalize"
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

                <View>
                  <Text
                    style={{ fontFamily: "SourceSans3-Regular" }}
                    className="text-neutral-normal mb-2"
                  >
                    Date Reported
                  </Text>
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    {problem?.reportedDate
                      ? format(new Date(problem.reportedDate), "MMMM d, yyyy")
                      : ""}
                  </Text>
                </View>

                <View className="h-px bg-neutral-light-hover my-5" />

                <View>
                  <View className="mb-5">
                    <Text
                      style={{ fontFamily: "SourceSans3-Regular" }}
                      className="text-neutral-normal mb-2"
                    >
                      Problem Title:
                    </Text>

                    <TextInput
                      style={{ fontFamily: "SourceSans3-Medium" }}
                      className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                      maxLength={20}
                      value={title}
                      onChangeText={(text) => {
                        setCharCount(text.length);
                        setTitle(text);
                      }}
                    />

                    <Text
                      style={{ fontFamily: "SourceSans3-Regular" }}
                      className="text-neutral-normal text-xs text-right mt-1"
                    >
                      {charCount}/20
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{ fontFamily: "SourceSans3-Regular" }}
                      className="text-neutral-normal mb-2"
                    >
                      Location:
                    </Text>

                    <TextInput
                      style={{ fontFamily: "SourceSans3-Medium" }}
                      className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                      value={locationName}
                      onChangeText={(text) => setLocationName(text)}
                    />
                  </View>

                  <View className="my-5">
                    <Text
                      style={{ fontFamily: "SourceSans3-Regular" }}
                      className="text-neutral-normal mb-2"
                    >
                      Additional Notes:
                    </Text>

                    <TextInput
                      style={{ fontFamily: "SourceSans3-Medium" }}
                      className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                      multiline={true}
                      numberOfLines={2}
                      value={additionalNotes}
                      onChangeText={(text) => setAdditionalNotes(text)}
                    />
                  </View>
                </View>

                <ButtonPrimary
                  title="Save"
                  onPress={handleUpdateProblem}
                  isLoading={isUpdating}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProblemScreen;


