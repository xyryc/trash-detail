import { StepComponentProps } from "@/types";
import { Button, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step3({ onComplete }: StepComponentProps) {
  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="p-4"
    >
      <Button title="Next" onPress={onComplete} />
    </AnimatedView>
  );
}
