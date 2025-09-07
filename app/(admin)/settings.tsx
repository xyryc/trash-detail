import { AdminScreen } from "@/components/admin/AdminScreen";
import { CustomerScreen } from "@/components/admin/CustomerScreen";
import { EmployeeScreen } from "@/components/admin/EmployeeScreen";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Header from "@/components/shared/Header";
import { useGetUserListQuery } from "@/store/slices/adminApiSlice";
import {
  useGetLoggedInUserDataQuery,
  useLogoutMutation,
} from "@/store/slices/authApiSlice";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SIDEBAR_WIDTH = 280;

const Settings = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("customer");

  const sidebarTranslateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const { data: loggedInUser } = useGetLoggedInUserDataQuery();
  const { data: userList } = useGetUserListQuery(activeScreen);

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

  // render active screen
  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "customer":
        return (
          <CustomerScreen
            activeScreen={activeScreen}
            customerData={userList?.data}
          />
        );
      case "employee":
        return (
          <EmployeeScreen
            activeScreen={activeScreen}
            employeeData={userList?.data}
          />
        );
      case "admin":
        return (
          <AdminScreen activeScreen={activeScreen} adminData={userList?.data} />
        );
      default:
        return (
          <CustomerScreen activeScreen={activeScreen} data={userList?.data} />
        );
    }
  };

  // Get screen title based on active screen
  const getScreenTitle = () => {
    switch (activeScreen) {
      case "customer":
        return "Customer List";
      case "employee":
        return "Employee List";
      case "admin":
        return "Admin List";
      default:
        return "Customer List";
    }
  };

  const [logout] = useLogoutMutation();
  // const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  // console.log(user, isAuthenticated);

  const handleLogout = async () => {
    await logout().unwrap();
    // Navigation will be handled automatically by AppRouter
  };

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
          </LinearGradient>

          {renderActiveScreen()}

          {/* Add New Button */}
          <ButtonPrimary
            onPress={() =>
              router.push(`/admin/settings/invitation/${activeScreen}`)
            }
            className="absolute bottom-6 right-6 px-3"
            title="Add New"
            icon={<FontAwesome6 name="add" size={24} color="white" />}
          />
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
          // @ts-ignore
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
            <View className="flex-row items-center justify-between px-6 py-4">
              <Text className="" style={{ fontFamily: "SourceSans3-Medium" }}>
                Settings
              </Text>
              <TouchableOpacity onPress={closeSidebar}>
                <Ionicons name="close" size={24} color="#4F4F4F" />
              </TouchableOpacity>
            </View>

            {/* Navigation Items */}
            <View className="flex-1">
              {/* Customer */}
              <TouchableOpacity
                onPress={() => handleSidebarNavigation("customer")}
                className="flex-row items-center gap-6 px-6 py-4 mx-6"
              >
                <Image
                  source={require("@/assets/images/customer.svg")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  className={`${
                    activeScreen === "customer"
                      ? "text-green-normal"
                      : "text-neutral-normal"
                  }`}
                  style={{
                    fontFamily:
                      activeScreen === "customer"
                        ? "SourceSans3-SemiBold"
                        : "SourceSans3-Regular",
                  }}
                >
                  Customer
                </Text>
              </TouchableOpacity>

              {/* Employee */}
              <TouchableOpacity
                onPress={() => handleSidebarNavigation("employee")}
                className="flex-row items-center gap-6 px-6 py-4 mx-6"
              >
                <Image
                  source={require("@/assets/images/employee.svg")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  className={`${
                    activeScreen === "employee"
                      ? "text-green-normal"
                      : "text-neutral-normal"
                  }`}
                  style={{
                    fontFamily:
                      activeScreen === "employee"
                        ? "SourceSans3-SemiBold"
                        : "SourceSans3-Regular",
                  }}
                >
                  Employee
                </Text>
              </TouchableOpacity>

              {/* Admin - Only show if user is superadmin */}
              {loggedInUser?.data.role !== "admin" && (
                <TouchableOpacity
                  onPress={() => handleSidebarNavigation("admin")}
                  className="flex-row items-center gap-6 px-6 py-4 mx-6"
                >
                  <Image
                    source={require("@/assets/images/admin.svg")}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Text
                    className={`${
                      activeScreen === "admin"
                        ? "text-green-normal"
                        : "text-neutral-normal"
                    }`}
                    style={{
                      fontFamily:
                        activeScreen === "admin"
                          ? "SourceSans3-SemiBold"
                          : "SourceSans3-Regular",
                    }}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* logout button */}
            <View className="px-10">
              <ButtonSecondary title="Logout" onPress={handleLogout} />
            </View>
          </SafeAreaView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default Settings;
