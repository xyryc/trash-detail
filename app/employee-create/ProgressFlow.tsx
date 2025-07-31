import CustomHeader from "@/components/shared/CustomHeader";
import React, { useState } from "react";
import { Button, SafeAreaView, StatusBar, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

// Step names configuration
const STEP_NAMES = {
  1: "Problem Details",
  2: "Additional Info",
  3: "Review & Submit",
};

const Step1 = ({ onComplete }) => (
  <AnimatedView
    entering={FadeIn.duration(300)}
    exiting={FadeOut.duration(200)}
    layout={Layout.springify()}
    className="p-4"
  >
    <Button title="Next" onPress={onComplete} />
  </AnimatedView>
);

const Step2 = ({ onComplete }) => (
  <AnimatedView
    entering={SlideInRight.duration(300)}
    exiting={SlideOutLeft.duration(200)}
    layout={Layout.springify()}
    className="p-4"
  >
    <Text className="text-lg font-bold">Additional Information</Text>
    <Button title="Next" onPress={onComplete} />
  </AnimatedView>
);

const Step3 = ({ onComplete }) => (
  <AnimatedView
    entering={SlideInRight.duration(300)}
    exiting={SlideOutLeft.duration(200)}
    layout={Layout.springify()}
    className="p-4"
  >
    <Text className="text-lg font-bold">Review & Submit</Text>
    <Button title="Submit" onPress={onComplete} />
  </AnimatedView>
);

export default function ProgressFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const totalSteps = 3;
  const progress = currentStep / totalSteps;

  const handleNext = () => {
    setDirection("forward");
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getAnimationStyle = (step) => {
    if (step === currentStep) {
      return direction === "forward"
        ? SlideInRight.duration(300)
        : SlideInRight.duration(300); // For back animation, use SlideInLeft
    }
    return undefined;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="px-6">
        {/* header */}
        <CustomHeader text="New Problem" />
      </View>

      <View className="flex-1 px-6 bg-[#F5F9F6]">
        {/* Progress Bar with Animation */}
        <View className="flex-row items-center justify-between mt-4 mb-1">
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-sm text-neutral-dark-active"
          >
            Step {currentStep} of {totalSteps}
          </Text>

          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-sm text-neutral-dark-active"
          >
            {currentStep}/{totalSteps}
          </Text>
        </View>

        <AnimatedView layout={Layout.springify()}>
          <Progress.Bar
            progress={progress}
            width={null}
            height={11}
            color="#386B45"
            unfilledColor="#E8EAED"
            borderWidth={0}
            borderRadius={100}
            animated={true}
            animationConfig={{ duration: 300 }}
          />
        </AnimatedView>

        {/* Animated Step Content */}
        <View className="flex-1">
          {currentStep === 1 && (
            <Step1 onComplete={handleNext} entering={getAnimationStyle(1)} />
          )}
          {currentStep === 2 && (
            <Step2 onComplete={handleNext} entering={getAnimationStyle(2)} />
          )}
          {currentStep === 3 && (
            <Step3 onComplete={handleNext} entering={getAnimationStyle(3)} />
          )}
        </View>

        {/* Navigation Buttons */}
        {/* <AnimatedView
          layout={Layout.springify()}
          className="flex-row justify-between px-4 py-4 bg-gray-50"
        >
          {currentStep > 1 && (
            <Button title="Back" onPress={handleBack} color="#6B7280" />
          )}
          <View className="flex-1" />
          <Button
            title={currentStep === totalSteps ? "Finish" : "Next"}
            onPress={handleNext}
            color="#3B82F6"
          />
        </AnimatedView> */}
      </View>
    </SafeAreaView>
  );
}
