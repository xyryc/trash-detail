import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EmployeeTabLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#374151", // Active text/icon color
        tabBarInactiveTintColor: "#9CA3AF", // Inactive text/icon color
        tabBarStyle: {
          height: 70 + insets.bottom,

          backgroundColor: "white",
          borderTopWidth: 0,
          shadowOpacity: 0.07, // Very light
          shadowRadius: 8, // Less blur
          elevation: 4, // Lower elevation on Android
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
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 h-16 mt-10 flex justify-center items-center gap-1.5 rounded-lg  ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
            >
              <Image
                source={require("@/assets/images/task-active.svg")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#386B45" : "black",
                }}
                cachePolicy="memory-disk"
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
        name="create"
        options={{
          tabBarIcon: () => (
            <View className="-mt-8">
              <Image
                source={require("@/assets/images/add.svg")}
                style={{ width: 82, height: 82 }}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              className="mx-auto"
              activeOpacity={0.8}
              onPress={() => router.push("/employee/create/progress")}
            >
              {props.children}
            </TouchableOpacity>
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-20 h-16 mt-10 flex justify-center items-center gap-1.5 rounded-lg  ${focused ? " bg-[#E2F2E5]" : "border border-neutral-light-hover"}`}
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
                Profile
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chatlist"
        options={{
          headerShown: false,
          href: null, // This hides the tab from the tab bar
        }}
      />
    </Tabs>
  );
}
