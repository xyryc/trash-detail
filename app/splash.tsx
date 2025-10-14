import { Image } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <View className="flex-row items-center">
        {/* Left Image */}
        <View>
          <Image
            source={require("@/assets/images/left-guy.svg")}
            style={{
              width: 124,
              height: 200,
            }}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>

        {/* Gap between images (24px) */}
        <View style={{ width: 24 }} />

        {/* Right Image */}
        <View>
          <Image
            source={require("@/assets/images/right-guy.svg")}
            style={{
              width: 124,
              height: 200,
            }}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
