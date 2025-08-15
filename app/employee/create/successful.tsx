import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Successful = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6 justify-center items-center">
        <Image
          source={require("@/assets/images/successful.svg")}
          style={{ width: 224, height: 165 }}
          contentFit="cover"
        />

        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-secondary-orange-600 text-2xl my-4 text-center"
        >
          Problem ID: P-13
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-2xl mb-2 text-center"
        >
          Problem Submitted!
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-center mb-8 text-neutral-normal"
        >
          Your complaint has been successfully submitted and will be forwarded
          to the customer after review.
        </Text>

        <View className="w-full gap-4">
          <ButtonPrimary
            title="Go to Problem List"
            onPress={() => router.push("/")}
          />
          <ButtonSecondary
            title="Start New"
            onPress={() => router.push("/employee/create/progress")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Successful;
