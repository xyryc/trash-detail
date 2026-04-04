import React, { useEffect, useMemo, useRef } from "react";
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

  const otpArray = useMemo(() => {
    const clean = (value || "").replace(/\D/g, "").slice(0, length);
    return Array.from({ length }, (_, i) => clean[i] || "");
  }, [length, value]);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputs.current[0]?.focus(), 80);
    }
  }, [autoFocus]);

  const handleChangeText = (text: string, index: number) => {
    const numericText = text.replace(/\D/g, "");

    // Paste scenario (e.g., user pastes full OTP)
    if (numericText.length > 1) {
      const pasted = numericText.slice(0, length);
      onChange(pasted);

      const focusIndex = Math.min(pasted.length, length - 1);
      setTimeout(() => inputs.current[focusIndex]?.focus(), 80);
      return;
    }

    const next = [...otpArray];
    next[index] = numericText;
    const nextValue = next.join("").slice(0, length);
    onChange(nextValue);

    if (numericText && index < length - 1) {
      setTimeout(() => inputs.current[index + 1]?.focus(), 80);
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      setTimeout(() => inputs.current[index - 1]?.focus(), 80);
    }
  };

  return (
    <View className="flex-row justify-center items-center">
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          className={`
              w-14 h-14 mx-3 border rounded-lg text-center text-sm font-medium
              ${otpArray[index] ? "border-green-normal bg-green-50" : "border-gray-300"}
              ${disabled ? "bg-green-normal-active" : "bg-white"}
            `}
          value={otpArray[index]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e as any, index)}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          placeholder="0"
          placeholderTextColor="#9CA3AF"
        />
      ))}
    </View>
  );
};

