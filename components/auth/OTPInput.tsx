// components/auth/OTPInput/OTPInput.tsx
import React, { useEffect, useRef } from "react";
import { TextInput, View } from "react-native";

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length,
  value,
  onChange,
  autoFocus = false,
  disabled = false,
}) => {
  const inputs = useRef<(TextInput | null)[]>([]);
  const otpArray = value
    .split("")
    .concat(Array(length - value.length).fill(""));

  useEffect(() => {
    if (autoFocus && inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChangeText = (text: string, index: number) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, "");

    if (numericText.length > 1) {
      // Handle paste scenario
      const pastedOTP = numericText.slice(0, length);
      onChange(pastedOTP);

      // Focus on the last filled input or next empty one
      const nextIndex = Math.min(pastedOTP.length - 1, length - 1);
      inputs.current[nextIndex]?.focus();
      return;
    }

    // Single digit input
    const newOTP = otpArray
      .map((digit, i) => (i === index ? numericText : digit))
      .join("")
      .replace(/undefined/g, "");

    onChange(newOTP);

    // Auto-focus next input
    if (numericText && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!otpArray[index] && index > 0) {
        // Move to previous input if current is empty
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    // Clear the input when focused if it's not the first empty one
    const firstEmptyIndex = otpArray.findIndex((digit) => !digit);
    if (firstEmptyIndex !== -1 && index > firstEmptyIndex) {
      inputs.current[firstEmptyIndex]?.focus();
    }
  };

  return (
    <View className="flex-row justify-center items-center">
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          className={`
              w-14 h-14 mx-3 border rounded-lg text-center text-sm font-medium
              ${otpArray[index] ? "border-green-normal bg-green-50" : "border-gray-300"}
              ${disabled ? "bg-green-normal-active" : "bg-white"}
            `}
          value={otpArray[index] || ""}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="numeric"
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          placeholder="0"
          placeholderTextColor="#9CA3AF"
        />
      ))}
    </View>
  );
};
