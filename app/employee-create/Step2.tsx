import { StepComponentProps } from "@/types";
import { Button, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step2({ onComplete }: StepComponentProps) {
  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="p-4"
    >
      {/* title */}
      <View className="my-10">
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-lg text-center"
        >
          Capture Photo
        </Text>
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-neutral-normal text-center"
        >
          Take a photo of the problem area
        </Text>
      </View>

      <Button title="Next" onPress={onComplete} />
    </AnimatedView>
  );
}
