import CustomHeader from "@/components/shared/CustomHeader";
import { getStepName } from "@/constants/Steps";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Animated, { Layout, SlideInRight } from "react-native-reanimated";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ProgressFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const totalSteps = 4;
  const progress = currentStep / totalSteps;
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = (data?: any) => {
    if (data?.imageUri) {
      setCapturedImage(data.imageUri);
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // After Step 4 → Go to Overview Screen
      router.push({
        pathname: "/employee-create/Successful",
        params: { imageUri: capturedImage },
      });
    }
  };

  // const handleBack = () => {
  //   setDirection("backward");
  //   setCurrentStep((prev) => Math.max(prev - 1, 1));
  // };

  const getAnimationStyle = (step: number) => {
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
        <CustomHeader
          text={`${currentStep === 4 ? "Overview" : "New Problem"}`}
        />
      </View>

      <View className="flex-1 bg-[#F5F9F6]">
        {/* Progress Bar with Animation */}
        <View className="flex-row px-6 items-center justify-between mt-4 mb-1">
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-sm text-neutral-dark-active"
          >
            {getStepName(currentStep)}
          </Text>

          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-sm text-neutral-dark-active"
          >
            {currentStep}/{totalSteps}
          </Text>
        </View>

        <AnimatedView layout={Layout.springify()} className="px-6">
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
            <Step2
              imageUri={capturedImage}
              onComplete={handleNext}
              entering={getAnimationStyle(2)}
              goToStep={setCurrentStep}
            />
          )}
          {currentStep === 3 && (
            <Step3
              imageUri={capturedImage}
              onComplete={handleNext}
              entering={getAnimationStyle(3)}
              goToStep={setCurrentStep}
            />
          )}
          {currentStep === 4 && (
            <Step4
              imageUri={capturedImage}
              onComplete={handleNext}
              entering={getAnimationStyle(4)}
              goToStep={setCurrentStep}
            />
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
