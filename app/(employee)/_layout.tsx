import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      {/* Problem Tab */}
      <Tabs.Screen
        name="problem"
        options={{
          title: "Problem",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <MaterialIcons
                name="report-problem"
                size={24}
                color={focused ? "#3B82F6" : "#9CA3AF"}
              />
              <Text
                className={`text-xs mt-1 ${
                  focused ? "text-blue-500" : "text-gray-400"
                }`}
              >
                Problem
              </Text>
            </View>
          ),
        }}
      />

      {/* Create Tab (Center Button) */}
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: () => (
            <View className="absolute -top-8">
              <TouchableOpacity
                className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center shadow-lg"
                activeOpacity={0.8}
              >
                <FontAwesome name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
          tabBarButton: (props) => (
            <View className="flex-1 items-center">{props.children}</View>
          ),
        }}
      />
    </Tabs>
  );
}
