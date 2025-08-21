import React from "react";
import { FlatList, View } from "react-native";
import UsersCard from "./UsersCard";

export const CustomerScreen = ({ customerData }: any) => {
  return (
    <View className="flex-1">
      <FlatList
        data={customerData}
        renderItem={({ item }) => <UsersCard item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
