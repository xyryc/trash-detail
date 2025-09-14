import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PasswordChanged = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Form Content */}
      <View className="flex-1 px-6 mt-32">
        <View className="items-center justify-center mb-8">
          <Image
            source={require("@/assets/images/done.svg")}
            style={{ width: 70, height: 55 }}
            contentFit="contain"
          />
        </View>

        <Text
          style={{ fontFamily: "SourceSans3-SemiBold" }}
          className="text-2xl text-center text-neutral-dark-active"
        >
          Password Changed!
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-center text-neutral-normal mb-5"
        >
          Return to the login page to enter your account with your new password.
        </Text>

        {/* Next Button */}
        <ButtonPrimary title={"Back to Sign In"} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default PasswordChanged;
