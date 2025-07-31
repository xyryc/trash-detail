import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#374151", // Active text/icon color
        tabBarInactiveTintColor: "#9CA3AF", // Inactive text/icon color
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
        headerShown: false, // Hide the header if you don't want it
      }}
    >
      <Tabs.Screen
        name="problem"
        options={{
          title: "Problem",
          tabBarIcon: ({ color, focused }) => (
            <View className={` rounded-2xl ${focused ? "bg-gray-100" : ""}`}>
              <Ionicons name="document-text-outline" size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View className="bg-green-600 w-14 h-14 rounded-full items-center justify-center shadow-lg">
              <Ionicons name="add" size={28} color="white" />
            </View>
          ),
          tabBarLabel: () => null, // Hide the label for the add button
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View className={`rounded-2xl ${focused ? "bg-gray-100" : ""}`}>
              <Ionicons name="person-outline" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
