import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const customerData = [
  { id: "C45", name: "Sakib Ahmed" },
  { id: "C46", name: "Mahmudur Rahman" },
  { id: "C47", name: "Anik Hassan" },
  { id: "C48", name: "Shafin Ahmed" },
  { id: "C49", name: "Rahim Khan" },
  { id: "C50", name: "Sumiya Begum" },
];

export const CustomerScreen = () => {
  const renderCustomerItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
      <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
        <Text className="text-green-600 font-semibold">
          {item.name.charAt(0)}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-sm">{item.id}</Text>
        <Text
          className="text-black font-medium text-base"
          style={{ fontFamily: "SourceSans3-Medium" }}
        >
          {item.name}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={customerData}
        renderItem={renderCustomerItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
