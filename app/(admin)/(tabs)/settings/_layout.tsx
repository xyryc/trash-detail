import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { useGetLoggedInUserDataQuery } from "@/store/slices/authApiSlice";
import { useLogoutMutation } from "@/store/slices/authApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SIDEBAR_WIDTH = 280;

function SettingsDrawerContent(props: any) {
  const { data: loggedInUser } = useGetLoggedInUserDataQuery();
  const [logout] = useLogoutMutation();

  const role = loggedInUser?.data?.role;
  const isSuperAdmin = role === "superadmin";

  const activeRouteName = props?.state?.routeNames?.[props?.state?.index] as
    | string
    | undefined;

  const activeKey = useMemo(() => {
    if (activeRouteName === "employee") return "employee";
    if (activeRouteName === "admin") return "superadmin";
    return "customer";
  }, [activeRouteName]);

  const navigateTo = useCallback(
    (key: "customer" | "employee" | "superadmin") => {
      if (key === "employee") props.navigation.navigate("employee");
      else if (key === "superadmin") props.navigation.navigate("admin");
      else props.navigation.navigate("index");
      props.navigation.closeDrawer();
    },
    [props.navigation]
  );

  const handleLogout = useCallback(async () => {
    await logout().unwrap();
  }, [logout]);

  return (
    <View style={{ flex: 1, backgroundColor: "white", width: SIDEBAR_WIDTH }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "bottom"]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingVertical: 16,
          }}
        >
          <Text style={{ fontFamily: "SourceSans3-Medium", fontSize: 16 }}>
            Settings
          </Text>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Ionicons name="close" size={24} color="#4F4F4F" />
          </TouchableOpacity>
        </View>

        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 0 }}
        >
          <TouchableOpacity
            onPress={() => navigateTo("customer")}
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
                  activeKey === "customer"
                    ? "SourceSans3-SemiBold"
                    : "SourceSans3-Regular",
                color: activeKey === "customer" ? "#386B45" : "#667085",
                fontSize: 16,
              }}
            >
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateTo("employee")}
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
                  activeKey === "employee"
                    ? "SourceSans3-SemiBold"
                    : "SourceSans3-Regular",
                color: activeKey === "employee" ? "#386B45" : "#667085",
                fontSize: 16,
              }}
            >
              Employee
            </Text>
          </TouchableOpacity>

          {isSuperAdmin && (
            <TouchableOpacity
              onPress={() => navigateTo("superadmin")}
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
                    activeKey === "superadmin"
                      ? "SourceSans3-SemiBold"
                      : "SourceSans3-Regular",
                  color: activeKey === "superadmin" ? "#386B45" : "#667085",
                  fontSize: 16,
                }}
              >
                Admin
              </Text>
            </TouchableOpacity>
          )}
        </DrawerContentScrollView>

        <View style={{ paddingHorizontal: 40, paddingBottom: 16 }}>
          <ButtonSecondary title="Logout" onPress={handleLogout} />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default function SettingsDrawerLayout() {
  return (
    <Drawer
      initialRouteName="index"
      drawerContent={(props) => <SettingsDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: { width: SIDEBAR_WIDTH },
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Customer" }} />
      <Drawer.Screen name="employee" options={{ title: "Employee" }} />
      <Drawer.Screen name="admin" options={{ title: "Admin" }} />
    </Drawer>
  );
}

