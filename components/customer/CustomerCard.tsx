import { CustomerListProps } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CustomerCard = ({
  customer,
  isSelected = false,
  onPress,
}: CustomerListProps) => {
  return (
    <TouchableOpacity
      className={`px-4 py-2 mb-2 border rounded-lg ${
        isSelected
          ? "bg-green-light-active border-green-normal-active"
          : "bg-green-light border-green-normal"
      }`}
      onPress={() => onPress?.(customer)}
    >
      <Text
        style={{ fontFamily: "SourceSans3-Medium" }}
        className="mb-2 text-neutral-dark-active"
      >
        {customer.userId}
      </Text>

      <View className="flex-row items-center gap-1">
        <Image
          source={require("@/assets/images/location.svg")}
          style={{ width: 16, height: 16 }}
          contentFit="contain"
        />

        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-neutral-dark-active"
        >
          {customer.addressLane1}, {customer.addressLane2}, {customer.city},{" "}
          {customer.state}, {customer.zipCode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCard;
