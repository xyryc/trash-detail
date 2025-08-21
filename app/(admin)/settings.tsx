import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Screen Types
type ScreenType = "customer" | "employees" | "admins";

interface NavItem {
  id: ScreenType;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const navigationItems: NavItem[] = [
  {
    id: "customer",
    title: "Customer",
    icon: "person",
  },
  {
    id: "employees",
    title: "Employees",
    icon: "people",
  },
  {
    id: "admins",
    title: "Admins",
    icon: "shield",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = 280;

// Sample data for different screens
const customerData = [
  { id: "C45", name: "Sakib Ahmed" },
  { id: "C46", name: "Mahmudur Rahman" },
  { id: "C47", name: "Anik Hassan" },
  { id: "C48", name: "Shafin Ahmed" },
];

const employeeData = [
  { id: "E45", name: "Rahim Khan" },
  { id: "E46", name: "Sumiya Begum" },
  { id: "E47", name: "Hasan Ali" },
  { id: "E48", name: "Farzana Khatun" },
];

const adminData = [
  { id: "A45", name: "Admin One" },
  { id: "A46", name: "Admin Two" },
  { id: "A47", name: "Admin Three" },
];

const Settings = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("customer");

  // Sidebar animation values
  const sidebarTranslateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarTranslateX, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        const { pageX } = evt.nativeEvent;

        return pageX < 50 && Math.abs(dx) > Math.abs(dy) && dx > 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;

        if (dx > 0 && dx < SIDEBAR_WIDTH) {
          sidebarTranslateX.setValue(-SIDEBAR_WIDTH + dx);
          overlayOpacity.setValue((dx / SIDEBAR_WIDTH) * 0.5);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, vx } = gestureState;

        if (dx > SIDEBAR_WIDTH * 0.5 || vx > 0.5) {
          openSidebar();
        } else {
          closeSidebar();
        }
      },
    })
  ).current;

  const handleSidebarNavigation = (screenType: ScreenType) => {
    setActiveScreen(screenType);
    closeSidebar();
  };

  // Get screen title based on active screen
  const getScreenTitle = () => {
    switch (activeScreen) {
      case "customer":
        return "Customer List";
      case "employees":
        return "Employee List";
      case "admins":
        return "Admin List";
      default:
        return "Customer List";
    }
  };

  // Get data based on active screen
  const getScreenData = () => {
    switch (activeScreen) {
      case "customer":
        return customerData;
      case "employees":
        return employeeData;
      case "admins":
        return adminData;
      default:
        return customerData;
    }
  };

  // Render list item
  const renderListItem = ({ item, index }: { item: any; index: number }) => (
    <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
      <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
        <Text className="text-green-600 font-semibold">
          {item.name.charAt(0)}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-sm">{item.id}</Text>
        <Text
          className="text-black font-medium text-base"
          style={{ fontFamily: "SourceSans3-Medium" }}
        >
          {item.name}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <SafeAreaView
        className="flex-1 bg-white"
        edges={["top", "left", "right"]}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View className="flex-1">
          <LinearGradient
            colors={["#EDFDF1", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              paddingHorizontal: 24,
              paddingBottom: 12,
            }}
          >
            <Header title={getScreenTitle()} />
            <SearchBar />
          </LinearGradient>

          {/* Screen Content */}
          <FlatList
            data={getScreenData()}
            renderItem={renderListItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {/* Add New Button */}
          <TouchableOpacity className="absolute bottom-6 right-6 bg-green-normal w-14 h-14 rounded-full items-center justify-center shadow-lg">
            <Ionicons name="add" size={24} color="white" />
            <Text
              className="absolute -bottom-6 text-xs text-green-normal font-medium"
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Add New
            </Text>
          </TouchableOpacity>
        </View>

        {/* Overlay */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: overlayOpacity,
            zIndex: 1,
          }}
          pointerEvents={overlayOpacity._value > 0 ? "auto" : "none"}
        >
          <Pressable style={{ flex: 1 }} onPress={closeSidebar} />
        </Animated.View>

        {/* Sidebar */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: SIDEBAR_WIDTH,
            backgroundColor: "white",
            transform: [{ translateX: sidebarTranslateX }],
            zIndex: 2,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <SafeAreaView className="flex-1" edges={["top", "left", "bottom"]}>
            {/* Sidebar Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
              <Text
                className="text-lg font-semibold"
                style={{ fontFamily: "SourceSans3-Medium" }}
              >
                Settings
              </Text>
              <TouchableOpacity onPress={closeSidebar}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Navigation Items */}
            <View className="flex-1 pt-4">
              {navigationItems.map((item) => {
                const isActive = activeScreen === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSidebarNavigation(item.id)}
                    className={`flex-row items-center px-6 py-4 mx-4 rounded-lg mb-2 ${
                      isActive
                        ? "bg-green-50 border-l-4 border-green-normal"
                        : "bg-transparent"
                    }`}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={isActive ? "#22C55E" : "#6B7280"}
                    />
                    <Text
                      className={`ml-3 text-base ${
                        isActive
                          ? "text-green-normal font-semibold"
                          : "text-gray-700 font-medium"
                      }`}
                      style={{
                        fontFamily: isActive
                          ? "SourceSans3-SemiBold"
                          : "SourceSans3-Medium",
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </SafeAreaView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default Settings;
