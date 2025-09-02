import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useSetNewPasswordMutation } from "@/store/authApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useLocalSearchParams();

  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();

  const handleNext = async () => {
    try {
      const result = await setNewPassword({
        email,
        password,
        confirmPassword,
      }).unwrap();
      if (result?.success) {
        router.push("/(auth)/PasswordChanged");
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.data?.message || "Password reset failed");
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Next Button */}
        <ButtonPrimary
          title={"Save"}
          onPress={handleNext}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
