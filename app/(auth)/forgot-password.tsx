import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { toast } from "@baronha/ting";
import { useForgotPasswordMutation } from "@/store/slices/authApiSlice";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleNext = async () => {
    if (!email) {
      toast({
        title: "Error",
        message: "Please enter your email",
        preset: "error",
        haptic: "error",
        backgroundColor: "#1F2937",
        titleColor: "#FFFFFF",
        messageColor: "#E5E7EB",
      });
      return;
    }

    try {
      const result = await forgotPassword({ email }).unwrap();

      if (result.success) {
        router.push({
          pathname: "/(auth)/verify-code",
          params: { email },
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        message: error.data?.message || "Failed to send reset code",
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingBottom: 24,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            <View className="px-6">
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

              <ButtonPrimary
                title={"Next"}
                onPress={handleNext}
                isLoading={isLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
