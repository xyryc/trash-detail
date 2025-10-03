import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import EmptySearchList from "../shared/EmptySearchList";
import SearchBar from "../shared/SearchBar";
import UsersCard from "./UsersCard";

interface EmployeeScreenProps {
  activeScreen: string;
  employeeData: {
    data: Array<{
      _id: string;
      name: string;
      email: string;
      userId: string;
      number: string;
      role: string;
    }>;
    success: boolean;
  };
  isLoading?: boolean;
  isUserLoading?: boolean;
}

export const EmployeeScreen: React.FC<EmployeeScreenProps> = ({
  activeScreen,
  employeeData,
  isLoading = false,
  isUserLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter employees based on search query
  const filteredEmployees = useMemo(() => {
    if (!employeeData?.data) return [];

    if (!searchQuery.trim()) {
      return employeeData.data;
    }

    const query = searchQuery.toLowerCase().trim();

    return employeeData.data.filter((employee) => {
      const nameMatch = employee.name?.toLowerCase().includes(query);
      const emailMatch = employee.email?.toLowerCase().includes(query);
      const userIdMatch = employee.userId?.toLowerCase().includes(query);
      const numberMatch = employee.number?.toLowerCase().includes(query);
      const roleMatch = employee.role?.toLowerCase().includes(query);

      return nameMatch || emailMatch || userIdMatch || numberMatch || roleMatch;
    });
  }, [employeeData, searchQuery]);

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Loading state
  if (isLoading || isUserLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#22C55E" />
        <Text
          className="mt-4 text-gray-600"
          style={{ fontFamily: "SourceSans3-Regular" }}
        >
          Loading employees...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={filteredEmployees}
        ListHeaderComponent={
          <View className="px-6 py-3">
            <SearchBar onSearch={handleSearch} value={searchQuery} />
            {searchQuery.trim().length > 0 && (
              <Text
                className="text-sm text-gray-600 mt-2"
                style={{ fontFamily: "SourceSans3-Regular" }}
              >
                Found {filteredEmployees.length} result
                {filteredEmployees.length !== 1 ? "s" : ""}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <UsersCard activeScreen={activeScreen} item={item} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <EmptySearchList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            emptyTitle="No employees yet"
            emptyMessage="Employees will appear here once added"
            emptyIcon="people-outline"
          />
        }
      />
    </View>
  );
};
