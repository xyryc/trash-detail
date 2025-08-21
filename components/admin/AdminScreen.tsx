import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const adminData = [
  { id: "A45", name: "Admin One", permissions: "Full Access" },
  { id: "A46", name: "Admin Two", permissions: "Limited Access" },
  { id: "A47", name: "Admin Three", permissions: "Read Only" },
];

const AdminScreen = () => {
  const renderAdminItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
      <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-4">
        <Ionicons name="shield" size={20} color="#8B5CF6" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-sm">{item.id}</Text>
        <Text
          className="text-black font-medium text-base"
          style={{ fontFamily: "SourceSans3-Medium" }}
        >
          {item.name}
        </Text>
        <Text className="text-gray-400 text-sm">{item.permissions}</Text>
      </View>
      <Ionicons name="settings" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={adminData}
        renderItem={renderAdminItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
