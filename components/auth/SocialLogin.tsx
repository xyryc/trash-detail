import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SocialLogin = ({}) => {
  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Sign in with Google...");
  };

  return (
    <TouchableOpacity
      className="rounded-lg py-2.5 flex-row items-center justify-center gap-2 bg-neutral-light"
      onPress={handleGoogleSignIn}
      activeOpacity={0.8}
    >
      <Image
        source={require("@/assets/images/google.png")}
        style={{ width: 24, height: 24 }}
        contentFit="contain"
      />

      <Text
        style={{
          fontFamily: "SourceSans3-Medium",
        }}
        className="text-green-normal"
      >
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

export default SocialLogin;
