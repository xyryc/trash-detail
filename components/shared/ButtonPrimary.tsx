import { ButtonProps } from "@/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonPrimary = ({
  title,
  onPress,
  icon,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-green-normal rounded-lg py-3 flex-row justify-center gap-2.5 ${className}`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {icon}
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
