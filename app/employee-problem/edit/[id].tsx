import problems from "@/assets/data/problems.json";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

const EditProblemScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const problem = problems.find(
    (item) => item.id?.toString() === id?.toString()
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Edit" />

        {/* main content */}
        <ScrollView
          className="py-4"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <Image
            className="rounded-md"
            source={problem?.image}
            style={{ width: "100%", height: 326 }}
            contentFit="fill"
          />

          <View className="border border-neutral-light-hover p-4 rounded-lg mt-6">
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
                  {problem?.id}
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
                {problem?.date}
              </Text>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* third row */}
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
                  defaultValue={problem?.problemStatus}
                />
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
                  defaultValue={problem?.location}
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
                  defaultValue={problem?.additionalNote}
                  multiline={true}
                  numberOfLines={2}
                />
              </View>
            </View>

            {/* save */}
            <ButtonPrimary
              title="Save"
              onPress={() => router.push("/(employee)/problem")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProblemScreen;
