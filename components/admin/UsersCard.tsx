import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const UsersCard = ({
  activeScreen,
  item,
}: {
  activeScreen: any;
  item: any;
}) => {
  const router = useRouter();
  console.log(activeScreen);

  return (
    <TouchableOpacity
      onPress={() => {
        if (activeScreen === "customer") {
          //@ts-ignore
          router.push(`/admin/settings/${activeScreen}/details/${item.id}`);
        } else if (activeScreen === "employee") {
          //@ts-ignore
          router.push(`/admin/settings/${activeScreen}/details/${item.id}`);
        }
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
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-green-normal"
        >
          {item.id}
        </Text>
        <Text
          style={{ fontFamily: "SourceSans3-Medium" }}
          className="text-black text-lg"
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UsersCard;
