import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { StepComponentProps } from "@/types";
import { Octicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step4({
  data,
  onComplete,
  goToStep,
  isLoading,
}: StepComponentProps) {
  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="py-4 flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="px-6 bg-[#F5F9F6]"
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          {/* image */}
          {data.imageUri && (
            <Image
              source={{ uri: data.imageUri }}
              style={{
                width: "100%",
                height: 326,
                borderRadius: 6,
                marginHorizontal: "auto",
              }}
              contentFit="cover"
            />
          )}

          {/* customer list */}
          <View className="bg-[#FFFFFF] border border-neutral-light p-4 rounded-lg mt-6">
            {/* first row */}
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
                {data.customerId}
              </Text>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* second row */}
            <View className="flex-row">
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
                  {data.problemTitle}
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
                  {format(
                    new Date(data.reportedDate || new Date()),
                    "MMMM d, yyyy"
                  )}
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
                {data.location}
              </Text>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* fourth row */}
            <View>
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
                {data.additionalNotes}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* back and next buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-8 py-4 px-6 bg-white border-t border-neutral-light-hover">
        <ButtonSecondary
          title="Back"
          onPress={() => goToStep?.(2)}
          className="flex-grow"
        />

        <ButtonPrimary
          className="flex-grow"
          title="Submit"
          onPress={() => {
            onComplete(data);
          }}
          isLoading={isLoading}
        />
      </View>
    </AnimatedView>
  );
}
