import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, TextInput, View } from "react-native";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push("/(auth)/PasswordChanged");
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
          Set New Password
        </Text>

        <Text
          style={{ fontFamily: "SourceSans3-Regular" }}
          className="text-center text-neutral-normal mb-5"
        >
          Set a new password and continue your journey.
        </Text>

        {/* New Password Input */}
        <View className="mb-5">
          <Text
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="text-neutral-normal mb-2"
          >
            New Password
          </Text>
          <TextInput
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="border border-neutral-light-active rounded-lg p-3 text-neutral-normal bg-white"
            placeholder="Type your password"
            placeholderTextColor="#7C7C7C"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password Input */}
        <View className="mb-5">
          <Text
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="text-neutral-normal mb-2"
          >
            Confirm Password
          </Text>
          <TextInput
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="border border-neutral-light-active rounded-lg p-3 text-neutral-normal bg-white"
            placeholder="Type your password"
            placeholderTextColor="#7C7C7C"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Next Button */}
        <ButtonPrimary title={"Save"} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
