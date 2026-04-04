import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useVerifyCodeMutation } from "@/store/slices/authApiSlice";
import { toast } from "@baronha/ting";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { OTPInput } from "input-otp-native";
import React, { useState } from "react";
import { Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyCode = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOTP] = useState("");
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const handleNext = async () => {
    const numericOTP = parseInt(otp, 10);

    try {
      const result = await verifyCode({ code: numericOTP }).unwrap();

      if (result.success) {
        toast({
          title: "Success",
          message: result.message,
          preset: "done",
          haptic: "success",
          backgroundColor: "#1F2937",
          titleColor: "#FFFFFF",
          messageColor: "#E5E7EB",
        });

        router.push({
          pathname: "/(auth)/reset-password",
          params: { email },
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        message: error.data?.message || "Failed to verify code",
        preset: "error",
        haptic: "error",
        backgroundColor: "#1F2937",
        titleColor: "#FFFFFF",
        messageColor: "#E5E7EB",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="mt-32 flex-1 px-6">
        <Text
          style={{ fontFamily: "SourceSans3-SemiBold" }}
          className="text-center text-2xl text-neutral-dark-active"
        >
          Verify Code
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="mx-auto mb-5 w-10/12 text-center text-neutral-normal"
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

        <OTPInput
          maxLength={4}
          value={otp}
          onChange={setOTP}
          textAlign="center"
          pattern="[0-9]*"
          containerStyle={{ marginHorizontal: 8 }}
          render={({ slots }) => (
            <View className="mb-1 flex-row justify-center gap-3">
              {slots.map((slot, index) => (
                <Pressable
                  key={index}
                  onPress={slot.focus}
                  className={`h-16 w-14 items-center justify-center rounded-xl border ${
                    slot.isActive
                      ? "border-green-normal"
                      : "border-neutral-light-active"
                  }`}
                >
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-2xl text-neutral-dark-active"
                  >
                    {slot.char ?? ""}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />

        <View className="mb-5 mt-6">
          <ButtonPrimary
            title={"Next"}
            onPress={handleNext}
            isLoading={isLoading}
          />
        </View>

        <View className="flex-row justify-center gap-1">
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-neutral-normal"
          >
            Don't receive OTP?
          </Text>

          <TouchableOpacity>
            {/* TODO: integrate resend OTP API for didn't receive OTP flow */}
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
          className="mt-6 flex-row items-center justify-center py-2.5"
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

