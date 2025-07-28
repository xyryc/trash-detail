import { OTPInput } from "@/components/auth/OTPInput";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const VerifyCode = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOTP] = useState("");

  const handleNext = () => {
    router.push("/(auth)/ResetPassword");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Form Content */}
      <View className="flex-1 px-6 mt-32">
        <Text
          style={{ fontFamily: "SourceSans3-SemiBold" }}
          className="text-2xl text-center text-neutral-dark-active"
        >
          Verify Code
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-center mb-5 text-neutral-normal w-10/12 mx-auto"
        >
          We sent OTP code to your email{" "}
          <Text
            style={{ fontFamily: "SourceSans3-Bold" }}
            className="font-bold"
          >
            {email}
          </Text>
          . Enter the code below to verify.
        </Text>

        {/* otp */}
        <OTPInput length={4} value={otp} onChange={setOTP} autoFocus />

        {/* Next Button */}
        <ButtonPrimary title={"Next"} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;
