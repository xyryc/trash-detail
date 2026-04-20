import { AdminScreen } from "@/components/admin/AdminScreen";
import { CustomerScreen } from "@/components/admin/CustomerScreen";
import { EmployeeScreen } from "@/components/admin/EmployeeScreen";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Header from "@/components/shared/Header";
import { useGetUserListQuery } from "@/store/slices/adminApiSlice";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingsScreenProps = {
  screenType: ScreenType;
};

const getScreenTitle = (screenType: ScreenType) => {
  switch (screenType) {
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

export default function SettingsScreen({ screenType }: SettingsScreenProps) {
  const router = useRouter();
  const navigation = useNavigation();

  const openSidebar = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const { data: userList, isLoading, refetch } = useGetUserListQuery(screenType);

  const renderScreen = () => {
    switch (screenType) {
      case "customer":
        return (
          <CustomerScreen
            activeScreen={screenType}
            customerData={userList}
            isLoading={isLoading}
          />
        );
      case "employee":
        return (
          <EmployeeScreen activeScreen={screenType} employeeData={userList} />
        );
      case "superadmin":
        return (
          <AdminScreen
            activeScreen={screenType}
            adminData={userList}
            refetch={refetch}
          />
        );
      default:
        return (
          <CustomerScreen
            activeScreen={screenType}
            customerData={userList}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
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
          <Header title={getScreenTitle(screenType)} openSidebar={openSidebar} />
        </LinearGradient>

        {renderScreen()}

        <ButtonPrimary
          onPress={() =>
            router.push(`/(admin)/settings/invitation/${screenType}`)
          }
          className="absolute bottom-6 right-6 px-3"
          title="Add New"
          icon={<FontAwesome6 name="add" size={24} color="white" />}
        />
      </View>
    </SafeAreaView>
  );
}

