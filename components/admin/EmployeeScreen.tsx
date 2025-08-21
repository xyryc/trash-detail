import { FlatList, View } from "react-native";
import UsersCard from "./UsersCard";

export const EmployeeScreen = ({ employeeData }: any) => {
  return (
    <View className="flex-1">
      <FlatList
        data={employeeData}
        renderItem={({ item }) => <UsersCard item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
