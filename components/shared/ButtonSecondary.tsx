import { ButtonProps } from "@/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonSecondary = ({
  title,
  onPress,
  icon,
  className,
  textColor,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`${className} bg-neutral-light-hover rounded-lg py-3 flex-row justify-center gap-2.5`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text
        style={{
          fontFamily: "SourceSans3-SemiBold",
        }}
        className={`text-center text-xl ${textColor} text-neutral-dark-active`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSecondary;
