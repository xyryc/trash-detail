import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Onboarding = () => {
  const router = useRouter();

  // Animation values
  const leftImageAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const rightImageAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(leftImageAnim, {
        toValue: 0, // Move to center position
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(rightImageAnim, {
        toValue: 0, // Move to center position
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to login after delay
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <View className="flex-row items-center">
        {/* Left Image */}
        <Animated.View
          style={{
            transform: [{ translateX: leftImageAnim }],
          }}
        >
          <Image
            source={require("@/assets/images/left-guy.svg")}
            style={{
              width: 124,
              height: 200,
            }}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </Animated.View>

        {/* Gap between images (24px) */}
        <View style={{ width: 24 }} />

        {/* Right Image */}
        <Animated.View
          style={{
            transform: [{ translateX: rightImageAnim }],
          }}
        >
          <Image
            source={require("@/assets/images/right-guy.svg")}
            style={{
              width: 124,
              height: 200,
            }}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
