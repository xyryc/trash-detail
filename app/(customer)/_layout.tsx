import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { View } from "react-native";

export default function EmployeeTabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#374151", // Active text/icon color
        tabBarInactiveTintColor: "#9CA3AF", // Inactive text/icon color
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
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
        name="chatlist"
        options={{
          title: "ChatList",
          tabBarIcon: ({ color, focused }) => (
            <View className={` rounded-2xl ${focused ? "bg-gray-100" : ""}`}>
              <Ionicons name="document-text-outline" size={24} color={color} />
            </View>
          ),
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
