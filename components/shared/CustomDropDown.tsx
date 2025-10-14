import { CustomDropdownProps, DropdownItem } from "@/types";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onValueChange,
  items,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedItem = items.find((item) => item.value === value);

  const handleSelect = (item: DropdownItem) => {
    onValueChange(item.value);
    setIsOpen(false);
  };

  return (
    <View className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <TouchableOpacity
        className="flex-row items-center justify-between border border-neutral-light-active rounded-lg px-4 py-3 bg-white"
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text
          className={`text-base ${value ? "text-neutral-dark" : "text-neutral-normal"}`}
          style={{ fontFamily: "SourceSans3-Medium" }}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>

        <Entypo name="chevron-small-down" size={18} color="#4D5464" />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center p-6">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-xl w-full max-w-sm max-h-80">
                {/* Header */}
                <View className="border-b border-neutral-light-hover px-4 py-3">
                  <Text
                    className="text-lg text-neutral-dark text-center"
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                  >
                    Select State
                  </Text>
                </View>

                {/* Options List */}
                <FlatList
                  data={items}
                  keyExtractor={(item) => item.value}
                  showsVerticalScrollIndicator={true}
                  className="max-h-60"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className={`px-4 py-3 border-b border-neutral-light-hover ${
                        value === item.value ? "bg-green-light" : "bg-white"
                      }`}
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`text-base ${
                          value === item.value
                            ? "text-green-normal"
                            : "text-neutral-dark"
                        }`}
                        style={{ fontFamily: "SourceSans3-Medium" }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <View className="px-4 py-3">
                      <Text className="text-neutral-normal text-center">
                        No options available
                      </Text>
                    </View>
                  }
                />

                {/* Close Button */}
                <TouchableOpacity
                  className="border-t border-neutral-light-hover px-4 py-3"
                  onPress={() => setIsOpen(false)}
                  activeOpacity={0.7}
                >
                  <Text
                    className="text-red-500 text-center text-base"
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
