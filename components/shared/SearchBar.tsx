import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <View
      className={`flex-row items-center rounded-lg px-3 py-2 bg-white border border-neutral-light-active ${
        isFocused ? "border border-neutral-light-active " : ""
      }`}
    >
      <Feather name="search" size={24} color="" className="mr-2" />

      <TextInput
        style={{ fontFamily: "SourceSans3-Medium" }}
        className="flex-1 text-base"
        placeholder="Search here..."
        placeholderTextColor="#9ca3af"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Feather name="x" size={20} color="#6b7280" />
        </TouchableOpacity>
      )}
    </View>
  );
}
