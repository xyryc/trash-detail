import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: 4,
        },
        tabBarActiveTintColor: "#386B45",
        tabBarInactiveTintColor: "#222222",
        tabBarActiveBackgroundColor: "#EBF0EC",
      }}
    >
      <Tabs.Screen
        name="problem"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View className="items-center justify-center">
              <MaterialIcons
                name="report-problem"
                size={24}
                color={focused ? "#3B82F6" : "#9CA3AF"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabLayout;
