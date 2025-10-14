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
import React, { useState } from "react";
import {
  Modal,
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();

  const { data: loggedInUser, isLoading: isUserLoading } =
    useGetLoggedInUserDataQuery();

  const {
    data: userList,
    isLoading,
    refetch,
  } = useGetUserListQuery(activeScreen);

  const openSidebar = () => {
    setIsSidebarVisible(true);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleSidebarNavigation = (screenType: ScreenType) => {
    setActiveScreen(screenType);
    closeSidebar();
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "customer":
        return (
          <CustomerScreen
            activeScreen={activeScreen}
            customerData={userList}
            isLoading={isLoading}
            isUserLoading={isUserLoading}
          />
        );

      case "employee":
        return (
          <EmployeeScreen activeScreen={activeScreen} employeeData={userList} />
        );

      case "superadmin":
        return (
          <AdminScreen
            activeScreen={activeScreen}
            adminData={userList}
            refetch={refetch}
          />
        );

      default:
        return (
          <CustomerScreen activeScreen={activeScreen} customerData={userList} />
        );
    }
  };

  const getScreenTitle = () => {
    switch (activeScreen) {
      case "customer":
        return "Customer List";

      case "employee":
        return "Employee List";

      case "superadmin":
        return "Admin List";

      default:
        return "Customer List";
    }
  };

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
  };

  // console.log(loggedInUser?.data?.role);

  return (
    <>
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
            <Header title={getScreenTitle()} openSidebar={openSidebar} />
          </LinearGradient>

          {renderActiveScreen()}

          {/* Add New Button */}
          <ButtonPrimary
            onPress={() =>
              router.push(`/(admin)/settings/invitation/${activeScreen}`)
            }
            className="absolute bottom-6 right-6 px-3"
            title="Add New"
            icon={<FontAwesome6 name="add" size={24} color="white" />}
          />
        </View>
      </SafeAreaView>

      {/* Sidebar Modal */}
      <Modal
        visible={isSidebarVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSidebar}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* Sidebar */}
          <View
            style={{
              width: SIDEBAR_WIDTH,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <SafeAreaView
              style={{ flex: 1 }}
              edges={["top", "left", "bottom", "right"]}
            >
              {/* Sidebar Header */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={{ fontFamily: "SourceSans3-Medium", fontSize: 16 }}
                >
                  Settings
                </Text>
                <TouchableOpacity onPress={closeSidebar}>
                  <Ionicons name="close" size={24} color="#4F4F4F" />
                </TouchableOpacity>
              </View>

              {/* Navigation Items */}
              <View style={{ flex: 1 }}>
                {/* Customer */}
                <TouchableOpacity
                  onPress={() => handleSidebarNavigation("customer")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 24,
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                    marginHorizontal: 24,
                  }}
                >
                  <Image
                    source={require("@/assets/images/customer.svg")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text
                    style={{
                      fontFamily:
                        activeScreen === "customer"
                          ? "SourceSans3-SemiBold"
                          : "SourceSans3-Regular",
                      color:
                        activeScreen === "customer" ? "#386B45" : "#667085",
                      fontSize: 16,
                    }}
                  >
                    Customer
                  </Text>
                </TouchableOpacity>

                {/* Employee */}
                <TouchableOpacity
                  onPress={() => handleSidebarNavigation("employee")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 24,
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                    marginHorizontal: 24,
                  }}
                >
                  <Image
                    source={require("@/assets/images/employee.svg")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text
                    style={{
                      fontFamily:
                        activeScreen === "employee"
                          ? "SourceSans3-SemiBold"
                          : "SourceSans3-Regular",
                      color:
                        activeScreen === "employee" ? "#386B45" : "#667085",
                      fontSize: 16,
                    }}
                  >
                    Employee
                  </Text>
                </TouchableOpacity>

                {/* Admin */}
                {loggedInUser?.data?.role === "superadmin" && (
                  <TouchableOpacity
                    onPress={() => handleSidebarNavigation("superadmin")}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 24,
                      paddingHorizontal: 24,
                      paddingVertical: 16,
                      marginHorizontal: 24,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/admin.svg")}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text
                      style={{
                        fontFamily:
                          activeScreen === "superadmin"
                            ? "SourceSans3-SemiBold"
                            : "SourceSans3-Regular",
                        color:
                          activeScreen === "superadmin" ? "#386B45" : "#667085",
                        fontSize: 16,
                      }}
                    >
                      Admin
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Logout button */}
              <View style={{ paddingHorizontal: 40, paddingBottom: 16 }}>
                <ButtonSecondary title="Logout" onPress={handleLogout} />
              </View>
            </SafeAreaView>
          </View>

          {/* Overlay - tap to close */}
          <Pressable
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
            onPress={closeSidebar}
          />
        </View>
      </Modal>
    </>
  );
};

export default Settings;
