import { FlatList, Text, TouchableOpacity, View } from "react-native";

const employeeData = [
  { id: "E45", name: "Rahim Khan", role: "Driver" },
  { id: "E46", name: "Sumiya Begum", role: "Supervisor" },
  { id: "E47", name: "Hasan Ali", role: "Helper" },
  { id: "E48", name: "Farzana Khatun", role: "Cleaner" },
  { id: "E49", name: "Abdul Rahman", role: "Driver" },
];

export const EmployeeScreen = () => {
  const renderEmployeeItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
      <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
        <Text className="text-blue-600 font-semibold">
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
        <Text className="text-gray-400 text-sm">{item.role}</Text>
      </View>
      <View className="items-center">
        <View className="w-2 h-2 bg-green-500 rounded-full mb-1" />
        <Text className="text-xs text-gray-500">Active</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={employeeData}
        renderItem={renderEmployeeItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
