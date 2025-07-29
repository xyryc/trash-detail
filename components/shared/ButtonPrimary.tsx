import { ButtonPrimaryProps } from "@/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonPrimary = ({ title, onPress }: ButtonPrimaryProps) => {
  return (
    <TouchableOpacity
      className="bg-green-normal rounded-lg py-2.5"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={{
          fontFamily: "SourceSans3-Medium",
        }}
        className="text-green-light text-center text-lg"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
