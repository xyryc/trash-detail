import SocialLogin from "@/components/auth/SocialLogin";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleNext = () => {
    // Handle account creation logic
    console.log("Creating account...");
    router.push("/(auth)/login");
  };

  const handleSignIn = () => {
    // Handle navigation to sign in
    console.log("Navigate to sign in...");
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header Illustration */}
      <View className="items-center pt-8 pb-5">
        <View className="flex-row items-center justify-center gap-2">
          {/* left guy */}
          <Image
            source={require("@/assets/images/left-guy.png")}
            style={{ width: 108, height: 168 }}
            contentFit="contain"
          />

          {/* right guy */}
          <Image
            source={require("@/assets/images/right-guy.png")}
            style={{ width: 108, height: 168 }}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Form Content */}
      <View className="flex-1 px-6">
        <Text
          style={{ fontFamily: "SourceSans3-SemiBold" }}
          className="text-2xl text-center mb-5 text-neutral-dark-active"
        >
          Create an Account
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
            placeholder="Type new password"
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
            placeholder="Re-type new password"
            placeholderTextColor="#7C7C7C"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Next Button */}
        <ButtonPrimary title={"Next"} onPress={handleNext} />

        {/* Sign In Link */}
        <TouchableOpacity onPress={handleSignIn} className="mb-5">
          <Text
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="text-center text-neutral-dark"
          >
            Already have an account?{" "}
            <Text
              style={{
                fontFamily: "SourceSans3-Medium",
              }}
              className="text-green-normal"
            >
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-neutral-light-active" />

          <Text
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="mx-4 text-neutral-normal"
          >
            OR
          </Text>

          <View className="flex-1 h-px bg-neutral-light-active" />
        </View>

        {/* Google Sign In Button */}
        <SocialLogin />
      </View>
    </SafeAreaView>
  );
};

export default Register;
