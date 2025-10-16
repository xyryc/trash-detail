import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { StepComponentProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step2({
  data,
  onComplete,
  goToStep,
}: StepComponentProps) {
  const [location, setLocation] = useState(data.location);
  const [problemTitle, setProblemTitle] = useState(data.problemTitle);
  const [additionalNotes, setAdditionalNotes] = useState(data.additionalNotes);

  const handleNext = () => {
    const updatedData = {
      location,
      problemTitle,
      additionalNotes,
    };

    // Call onComplete function to update the data object in the parent component
    onComplete(updatedData);
  };

  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="py-4 flex-1"
    >
      <ScrollView
        className="px-4 bg-[#F5F9F6]"
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {/* title */}
        <View className="flex-grow my-10">
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-lg text-center"
          >
            Problem Details
          </Text>
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-neutral-normal text-center"
          >
            Add a title and description for this issue
          </Text>
        </View>

        {/* image */}
        <View>
          {data.imageUri && (
            <Image
              source={{ uri: data.imageUri }}
              style={{
                height: 300,
                borderRadius: 10,
                marginHorizontal: 8,
              }}
              contentFit="cover"
            />
          )}
        </View>

        {/* form */}
        <View className="bg-white border-[0.5px] border-neutral-light-hover p-4 mx-2 rounded-lg mt-10 mb-20">
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
              placeholder="5th Avenue, Manhattan, New York"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View className="my-5">
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal mb-2"
            >
              Problem Title:
            </Text>

            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="Car Parked"
              maxLength={20}
              value={problemTitle}
              onChangeText={setProblemTitle}
            />

            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className={`text-xs text-right mt-1 ${
                //@ts-ignore
                problemTitle.length > 18
                  ? "text-error-normal"
                  : "text-neutral-normal"
              }`}
            >
              {problemTitle?.length}/20
            </Text>
          </View>

          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal mb-2"
            >
              Additional Notes:
            </Text>

            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="We couldn't collect the trash because a car is blocking the bin."
              multiline={true}
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
            />
          </View>
        </View>
      </ScrollView>

      {/* retake and next buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-8 py-4 px-6 bg-white border-t border-neutral-light-hover">
        <ButtonSecondary
          title="Retake"
          onPress={() => goToStep?.(1)}
          icon={<Feather name="camera" size={24} color="black" />}
          className="flex-grow"
        />

        <ButtonPrimary
          title="Next"
          onPress={handleNext}
          className="flex-grow"
        />
      </View>
    </AnimatedView>
  );
}
