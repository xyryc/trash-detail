import { SearchBarProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarWithCallbackProps extends SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({
  className,
  onSearch,
}: SearchBarWithCallbackProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    onSearch(text);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <View
      className={`flex-row items-center rounded-lg px-3 py-2 ${className} border ${
        isFocused ? "border-green-normal" : "border-neutral-light-active"
      }`}
    >
      <Feather name="search" size={24} color="#6B7280" className="mr-2" />

      <TextInput
        style={{ fontFamily: "SourceSans3-Medium" }}
        className="flex-1 text-base"
        placeholder="Search here..."
        placeholderTextColor="#9ca3af"
        value={searchQuery}
        onChangeText={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
      />

      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Feather name="x" size={20} color="#6b7280" />
        </TouchableOpacity>
      )}
    </View>
  );
}
