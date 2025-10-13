import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { CameraStepProps } from "@/types";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step1({ onComplete }: CameraStepProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      onComplete({ imageUri: photo.uri });
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ButtonPrimary
          title="Grant Permission"
          onPress={requestPermission}
          className="w-2/3"
        />

        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-center my-4"
        >
          We need your permission to use the camera
        </Text>
      </View>
    );
  }

  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="p-4 flex-1 justify-between"
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

      {/* camera preview */}
      <CameraView
        ref={cameraRef}
        style={{ flex: 1, borderRadius: 6, marginHorizontal: 8 }}
        facing={facing}
      />

      {/* capture button */}
      <View className="mt-10">
        {/* <Button title="Next" onPress={onComplete} /> */}
        <TouchableOpacity onPress={handleCapture}>
          <Image
            source={require("@/assets/images/capture.svg")}
            style={{
              width: 76,
              height: 76,
              margin: "auto",
            }}
            contentFit="contain"
          />
        </TouchableOpacity>

        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-neutral-normal text-center mt-4"
        >
          Tap to capture
        </Text>
      </View>
    </AnimatedView>
  );
}
