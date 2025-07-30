import { ButtonProps } from "@/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonSecondary = ({ title, onPress, icon }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-neutral-light-hover rounded-lg py-2.5 flex-row justify-center gap-2.5"
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text
        style={{
          fontFamily: "SourceSans3-SemiBold",
        }}
        className="text-neutral-dark-active text-center text-xl"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSecondary;
