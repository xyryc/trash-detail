import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useLoginMutation } from "@/store/slices/authApiSlice";
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
  const [login, { isLoading }] = useLoginMutation();

  const handleNext = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      // console.log(result.user);
      // console.log("Auth token", await AsyncStorage.getItem("auth_token"));
      // console.log("User data", await AsyncStorage.getItem("user_data"));

      // role based navigation
      if (result.user.role === "customer") {
        router.replace("/(customer)/chatlist");
      } else if (result.user.role === "employee") {
        router.replace("/(employee)/problem");
      } else if (result.user.role === "admin" || "superadmin") {
        router.replace("/(admin)/problem");
      }
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.data?.message || "Something went wrong"
      );
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
        <View className="mb-5">
          <ButtonPrimary
            title={"Login"}
            onPress={handleNext}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
