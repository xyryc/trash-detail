import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const ChatList = () => {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        <LinearGradient
          colors={["#EDFDF1", "#FFFFFF"]} // 0% to 100%
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 1 }} // Bottom (180deg)
          style={{
            paddingHorizontal: 24,
            paddingBottom: 12,
          }}
        >
          <Header title={"Chat List"} />

          <SearchBar />
        </LinearGradient>

        {/* Tabs */}
        <View className="flex-row px-6">
          <TouchableOpacity
            onPress={() => setSelectedTab("problem")}
            className="px-3.5 py-3 border"
          >
            <Text
              className={`text-sm  font-semibold pb-2 ${
                selectedTab === "problem"
                  ? "text-green-normal"
                  : "text-gray-500"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Problem
            </Text>
            {selectedTab === "problem" && (
              <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
            {/* Red dot indicator */}
            <View className="absolute top-0 right-8 w-2 h-2 bg-red-500 rounded-full" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab("support")}
            className="px-3.5 py-3 border"
          >
            <Text
              className={`text-sm  font-semibold pb-2 ${
                selectedTab === "support"
                  ? "text-green-normal"
                  : "text-gray-500"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Support
            </Text>
            {selectedTab === "support" && (
              <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
            {/* Red dot indicator */}
            <View className="absolute top-0 right-8 w-2 h-2 bg-red-500 rounded-full" />
          </TouchableOpacity>
        </View>

        {/* chat list */}
        <ScrollView className="flex-1"></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatList;
