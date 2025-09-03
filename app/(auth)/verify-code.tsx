import { OTPInput } from "@/components/auth/OTPInput";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useVerifyCodeMutation } from "@/store/slices/authApiSlice";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const VerifyCode = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOTP] = useState("");
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const handleNext = async () => {
    const numericOTP = parseInt(otp, 10);
    console.log(numericOTP);

    try {
      const result = await verifyCode({ code: numericOTP }).unwrap();
      console.log(result);
      Alert.alert("Success", result.message);
      if (result.success) {
        router.push({
          pathname: "/(auth)/reset-password",
          params: { email },
        });
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.data?.message || "Failed to verify code");
    }
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
        <View className="mb-5 mt-6">
          <ButtonPrimary
            title={"Next"}
            onPress={handleNext}
            isLoading={isLoading}
          />
        </View>

        {/* resend */}
        <View className="flex-row justify-center gap-1">
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-neutral-normal"
          >
            Don't receive OTP?
          </Text>

          <TouchableOpacity>
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-green-normal"
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          className="flex-row items-center justify-center py-2.5 mt-6"
        >
          <Image
            source={require("@/assets/images/arrow-left.svg")}
            style={{
              height: 24,
              width: 24,
            }}
          />

          <Text
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="text-[#3D3D3D]"
          >
            Back to Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;
