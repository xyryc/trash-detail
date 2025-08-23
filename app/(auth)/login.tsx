import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
    // Simple credential check
    if (email === "customer" && password === "123456") {
      router.replace("/(customer)/chatlist");
    } else if (email === "employee" && password === "123456") {
      router.replace("/(employee)/problem");
    } else if (email === "admin" && password === "123456") {
      router.replace("/(admin)/problem");
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header Illustration */}
      <View className="items-center pt-8">
        <View className="flex-row items-center justify-center gap-2">
          {/* left guy */}
          <Image
            source={require("@/assets/images/left-guy.svg")}
            style={{ width: 108, height: 168 }}
            contentFit="contain"
          />

          {/* right guy */}
          <Image
            source={require("@/assets/images/right-guy.svg")}
            style={{ width: 108, height: 168 }}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Form Content */}
      <View className="flex-1 px-6">
        <Text
          style={{ fontFamily: "SourceSans3-SemiBold" }}
          className="text-xl text-center my-5 text-neutral-dark-active"
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
            Username
          </Text>
          <TextInput
            style={{
              fontFamily: "SourceSans3-Medium",
            }}
            className="border border-neutral-light-active rounded-lg p-3 text-neutral-normal bg-white"
            placeholder="customer, employee, or admin"
            placeholderTextColor="#7C7C7C"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
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
            placeholder="123456"
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
        <View className="mb-5">
          <ButtonPrimary title={"Login"} onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
