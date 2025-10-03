import { CustomerScreenProps } from "@/types";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import EmptySearchList from "../shared/EmptySearchList";
import SearchBar from "../shared/SearchBar";
import UsersCard from "./UsersCard";

export const CustomerScreen: React.FC<CustomerScreenProps> = ({
  activeScreen,
  customerData,
  isLoading = false,
  isUserLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter customers based on search query
  const filteredCustomers = useMemo(() => {
    if (!customerData?.data) return [];

    if (!searchQuery.trim()) {
      return customerData.data;
    }

    const query = searchQuery.toLowerCase().trim();

    return customerData.data.filter((customer) => {
      const nameMatch = customer.name?.toLowerCase().includes(query);
      const emailMatch = customer.email?.toLowerCase().includes(query);
      const userIdMatch = customer.userId?.toLowerCase().includes(query);
      const numberMatch = customer.number?.toLowerCase().includes(query);
      const cityMatch = customer.city?.toLowerCase().includes(query);
      const addressMatch =
        customer.addressLane1?.toLowerCase().includes(query) ||
        customer.addressLane2?.toLowerCase().includes(query);

      return (
        nameMatch ||
        emailMatch ||
        userIdMatch ||
        numberMatch ||
        cityMatch ||
        addressMatch
      );
    });
  }, [customerData, searchQuery]);

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
          Loading customers...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={filteredCustomers}
        ListHeaderComponent={
          <View className="px-6 py-3">
            <SearchBar onSearch={handleSearch} />
            {searchQuery.trim().length > 0 && (
              <Text
                className="text-sm text-gray-600 mt-2"
                style={{ fontFamily: "SourceSans3-Regular" }}
              >
                Found {filteredCustomers.length} result
                {filteredCustomers.length !== 1 ? "s" : ""}
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
          />
        }
      />
    </View>
  );
};
