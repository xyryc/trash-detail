import SocialLogin from "@/components/auth/SocialLogin";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNext = () => {
    // Handle account creation logic
    console.log("Logging in...");
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
          Login
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
            Password
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

          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            className="mt-2"
          >
            <Text
              style={{
                fontFamily: "SourceSans3-Medium",
              }}
              className=" text-neutral-dark text-right"
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        {/* Next Button */}
        <ButtonPrimary title={"Next"} onPress={handleNext} />

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

export default Login;
