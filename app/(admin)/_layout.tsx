import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function AdminTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#374151", // Active text/icon color
        tabBarInactiveTintColor: "#9CA3AF", // Inactive text/icon color
        tabBarStyle: {
          height: 96,
          paddingTop: 20,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },

        headerShown: false, // Hide the header if you don't want it
      }}
    >
      <Tabs.Screen
        name="problem"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 flex justify-center items-center gap-2 rounded-lg h-16 ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
            >
              <Ionicons
                name="document-text-outline"
                size={24}
                color={focused ? "#386B45" : color}
              />
              <Text
                style={{
                  fontFamily: focused
                    ? "SourceSans3-SemiBold"
                    : "SourceSans3-Regular",
                }}
                className={`text-sm ${focused ? "text-green-normal" : ""}`}
              >
                Problem
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chatlist"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 flex justify-center items-center gap-2 rounded-lg h-16 ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={focused ? "#386B45" : color}
              />
              <Text
                style={{
                  fontFamily: focused
                    ? "SourceSans3-SemiBold"
                    : "SourceSans3-Regular",
                }}
                className={`text-sm ${focused ? "text-green-normal" : ""}`}
              >
                Chats
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 flex justify-center items-center gap-2 rounded-lg h-16 ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? "#386B45" : color}
              />
              <Text
                style={{
                  fontFamily: focused
                    ? "SourceSans3-SemiBold"
                    : "SourceSans3-Regular",
                }}
                className={`text-sm ${focused ? "text-green-normal" : ""}`}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
