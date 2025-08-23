import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EmployeeTabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#374151", // Active text/icon color
        // tabBarInactiveTintColor: "#9CA3AF", // Inactive text/icon color
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingTop: 20,
          backgroundColor: "white",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 }, // no offset
          shadowOpacity: 0.07, // ~ #00000017
          shadowRadius: 7, // same as blur radius
          elevation: 4, // for Android (tweak to match iOS look)
        },
        headerShown: false, // Hide the header if you don't want it
      }}
    >
      <Tabs.Screen
        name="chatlist"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 h-16 flex justify-center items-center gap-1.5 rounded-lg  ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
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
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 h-16 flex justify-center items-center gap-1.5 rounded-lg  ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
            >
              <AntDesign
                name="user"
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
