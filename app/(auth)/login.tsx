import ButtonPrimary from "@/components/shared/ButtonPrimary";
import { useLoginMutation } from "@/store/slices/authApiSlice";
import { toast } from "@baronha/ting";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleNext = async () => {
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Error",
        message: "Please fill in both fields",
        preset: "error",
        haptic: "error",
        backgroundColor: "#1F2937",
        titleColor: "#FFFFFF",
        messageColor: "#E5E7EB",
      });
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();

      if (result.user.role === "customer") {
        router.replace("/(customer)/(tabs)/chatlist");
      } else if (result.user.role === "employee") {
        router.replace("/(employee)/(tabs)/problem");
      } else if (result.user.role === "admin" || "superadmin") {
        router.replace("/(admin)/(tabs)/problem");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        message: error.data?.message || "Something went wrong",
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 24}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: isKeyboardVisible ? "flex-start" : "center",
              paddingBottom: 24,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center">
              <View className="flex-row items-center justify-center gap-2">
                <Image
                  source={require("@/assets/images/left-guy.svg")}
                  style={{ width: 108, height: 168 }}
                  contentFit="contain"
                />

                <Image
                  source={require("@/assets/images/right-guy.svg")}
                  style={{ width: 108, height: 168 }}
                  contentFit="contain"
                />
              </View>
            </View>

            <View className="px-6">
              <Text
                style={{ fontFamily: "SourceSans3-SemiBold" }}
                className="text-xl text-center my-5 text-neutral-dark-active"
              >
                Login
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
                  autoCapitalize="none"
                />
              </View>

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
                  className="mt-2 self-end"
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

              <View className="mb-5">
                <ButtonPrimary
                  title={"Login"}
                  onPress={handleNext}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
