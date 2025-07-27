import { Image } from "expo-image";
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

  const handleNext = () => {
    // Handle account creation logic
    console.log("Creating account...");
  };

  const handleSignIn = () => {
    // Handle navigation to sign in
    console.log("Navigate to sign in...");
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Sign in with Google...");
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
        <Text className="text-2xl font-semibold text-center mb-5 text-gray-800">
          Create an Account
        </Text>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-2 font-medium">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white"
            placeholder="example@gmail.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* New Password Input */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-2 font-medium">New Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white"
            placeholder="Type new password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password Input */}
        <View className="mb-8">
          <Text className="text-gray-600 mb-2 font-medium">
            Confirm Password
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white"
            placeholder="Re-type new password"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className="bg-green-600 rounded-lg py-4 mb-6"
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Next
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity onPress={handleSignIn} className="mb-6">
          <Text className="text-center text-gray-600">
            Already have an account?{" "}
            <Text className="text-green-600 font-medium">Sign In</Text>
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 font-medium">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Google Sign In Button */}
        <TouchableOpacity
          className="border border-gray-300 rounded-lg py-4 flex-row items-center justify-center bg-gray-50"
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <View className="w-5 h-5 mr-3 bg-white rounded-full items-center justify-center">
            <Text className="text-xs font-bold text-red-500">G</Text>
          </View>
          <Text className="text-gray-700 font-medium text-base">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
