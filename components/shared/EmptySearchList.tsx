import { EmptySearchListProps } from "@/types/chat";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EmptySearchList = ({
  searchQuery,
  setSearchQuery,
}: EmptySearchListProps) => {
  const isSearching = searchQuery.trim().length > 0;

  return (
    <View className="flex-1 items-center justify-center py-20">
      <MaterialIcons
        name={isSearching ? "search-off" : "chat-bubble-outline"}
        size={48}
        color="#9CA3AF"
      />
      <Text
        className="text-gray-500 text-center mt-4"
        style={{ fontFamily: "SourceSans3-Medium" }}
      >
        {isSearching ? "No chats found" : "No support chats yet"}
      </Text>
      <Text
        className="text-gray-400 text-center mt-1 text-sm px-8"
        style={{ fontFamily: "SourceSans3-Regular" }}
      >
        {isSearching
          ? `No results for "${searchQuery}"`
          : "Start a new conversation to get help"}
      </Text>
      {isSearching && (
        <TouchableOpacity
          onPress={() => setSearchQuery("")}
          className="mt-4 px-4 py-2 bg-green-normal rounded-lg"
        >
          <Text
            className="text-white text-sm"
            style={{ fontFamily: "SourceSans3-SemiBold" }}
          >
            Clear Search
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptySearchList;
