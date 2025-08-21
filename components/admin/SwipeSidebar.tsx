import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SwipeSidebarProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const navigationItems: NavItem[] = [
  {
    id: "customer",
    title: "Customer",
    icon: "person",
    route: "/admin/customer-list",
  },
  {
    id: "employees",
    title: "Employees",
    icon: "people",
    route: "/admin/employee-list",
  },
  {
    id: "admins",
    title: "Admins",
    icon: "shield",
    route: "/admin/admin-list",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = 280;

const SwipeSidebar: React.FC<SwipeSidebarProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

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
        // Detect swipe from left edge (within 50px from left edge)
        const { dx, dy } = gestureState;
        const { pageX } = evt.nativeEvent;

        return (
          pageX < 50 && // Started from left edge
          Math.abs(dx) > Math.abs(dy) && // More horizontal than vertical
          dx > 0 // Swiping right
        );
      },
      onPanResponderGrant: () => {
        // Start opening sidebar
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;

        if (dx > 0 && dx < SIDEBAR_WIDTH) {
          // Update sidebar position based on gesture
          sidebarTranslateX.setValue(-SIDEBAR_WIDTH + dx);
          overlayOpacity.setValue((dx / SIDEBAR_WIDTH) * 0.5);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, vx } = gestureState;

        // Open sidebar if swiped more than 50% or fast swipe
        if (dx > SIDEBAR_WIDTH * 0.5 || vx > 0.5) {
          openSidebar();
        } else {
          closeSidebar();
        }
      },
    })
  ).current;

  const handleNavigation = (route: string) => {
    router.push(route);
    closeSidebar();
  };

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {/* Main Content */}
      {children}

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
          {/* Header */}
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
              const isActive = isActiveRoute(item.route);

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleNavigation(item.route)}
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
    </View>
  );
};

export default SwipeSidebar;
