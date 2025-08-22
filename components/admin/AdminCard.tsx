import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AdminCard = ({
  activeScreen,
  item,
}: {
  activeScreen: any;
  item: any;
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/admin/settings/admin/details/${item.id}`);
      }}
      className="flex-row items-center gap-4 px-6 py-4 border-b border-neutral-light-active"
    >
      <View className="w-[42px] h-[42px] bg-white border border-neutral-light-hover rounded-lg items-center justify-center">
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-neutral-darker"
        >
          {item.name.charAt(0)}
        </Text>
      </View>

      <View className="flex-1">
        <Text style={{ fontFamily: "SourceSans3-Medium" }} className="text-lg">
          {item.name}
        </Text>
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-sm text-green-normal capitalize"
        >
          {item.role === "super" ? "Super Admin" : item.role}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdminCard;
