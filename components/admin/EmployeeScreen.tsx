import { FlatList, View } from "react-native";
import SearchBar from "../shared/SearchBar";
import UsersCard from "./UsersCard";

export const EmployeeScreen = ({ activeScreen, employeeData }: any) => {
  return (
    <View className="flex-1">
      <FlatList
        data={employeeData.data}
        ListHeaderComponent={
          <View className="px-6 py-3">
            <SearchBar />
          </View>
        }
        renderItem={({ item }) => (
          <UsersCard activeScreen={activeScreen} item={item} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
