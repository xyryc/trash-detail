import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, TextInput, View } from "react-native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: "/(auth)/verify-code",
      params: { email },
    });
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
          Forgot password?
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-center mb-5 text-neutral-normal"
        >
          Enter your email to reset your password.
        </Text>

        {/* Email Input */}
        <View className="mb-5">
          <Text
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="text-neutral-normal mb-2"
          >
            Email
          </Text>
          <TextInput
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="border border-neutral-light-active rounded-lg p-3 text-neutral-normal bg-white"
            placeholder="example@gmail.com"
            placeholderTextColor="#7C7C7C"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Next Button */}
        <ButtonPrimary title={"Next"} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
