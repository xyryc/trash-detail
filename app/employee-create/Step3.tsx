import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import SearchBar from "@/components/shared/SearchBar";
import { StepComponentProps } from "@/types";
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

export default function Step3({
  imageUri,
  onComplete,
  goToStep,
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
        <View className="px-6 bg-[#F5F9F6]">
          {/* image */}
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 210,
                height: 210,
                borderRadius: 6,
                marginHorizontal: "auto",
              }}
              contentFit="cover"
            />
          )}

          {/* customer list */}
          <View className="my-4">
            <SearchBar className="bg-[#F2F2F2]" />
            {/* TODO: fix not scrolling issue */}
            <ScrollView className="my-3 p-2 bg-neutral-light-hover rounded-lg">
              <View className="px-4 py-2 bg-[#EBF0EC] mb-2 border border-green-normal rounded-lg">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mb-2 text-neutral-dark-active"
                >
                  C-13
                </Text>

                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("@/assets/images/location.svg")}
                    style={{ width: 16, height: 16 }}
                    contentFit="contain"
                  />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-dark-active"
                  >
                    5th Avenue, Manhattan, New York
                  </Text>
                </View>
              </View>

              <View className="px-4 py-2 bg-[#EBF0EC] mb-2 border border-green-normal rounded-lg">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mb-2 text-neutral-dark-active"
                >
                  C-13
                </Text>

                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("@/assets/images/location.svg")}
                    style={{ width: 16, height: 16 }}
                    contentFit="contain"
                  />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-dark-active"
                  >
                    5th Avenue, Manhattan, New York
                  </Text>
                </View>
              </View>

              <View className="px-4 py-2 bg-[#EBF0EC] mb-2 border border-green-normal rounded-lg">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mb-2 text-neutral-dark-active"
                >
                  C-13
                </Text>

                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("@/assets/images/location.svg")}
                    style={{ width: 16, height: 16 }}
                    contentFit="contain"
                  />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-dark-active"
                  >
                    5th Avenue, Manhattan, New York
                  </Text>
                </View>
              </View>

              <View className="px-4 py-2 bg-[#EBF0EC] mb-2 border border-green-normal rounded-lg">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mb-2 text-neutral-dark-active"
                >
                  C-13
                </Text>

                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("@/assets/images/location.svg")}
                    style={{ width: 16, height: 16 }}
                    contentFit="contain"
                  />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-dark-active"
                  >
                    5th Avenue, Manhattan, New York
                  </Text>
                </View>
              </View>

              <View className="px-4 py-2 bg-[#EBF0EC] mb-2 border border-green-normal rounded-lg">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mb-2 text-neutral-dark-active"
                >
                  C-13
                </Text>

                <View className="flex-row items-center gap-1">
                  <Image
                    source={require("@/assets/images/location.svg")}
                    style={{ width: 16, height: 16 }}
                    contentFit="contain"
                  />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-dark-active"
                  >
                    5th Avenue, Manhattan, New York
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* retake and next buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-8 py-4 px-6 bg-white border-t border-neutral-light-hover">
        <ButtonSecondary
          title="Back"
          onPress={() => goToStep?.(2)}
          className="flex-grow"
        />

        <ButtonPrimary
          title="Next"
          onPress={onComplete}
          className="flex-grow"
        />
      </View>
    </AnimatedView>
  );
}
