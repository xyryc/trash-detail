import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const hasOnboarded = true;
  const isLoading = false;
  // const user = false;
  const user = { id: "123", role: "admin" };

  useEffect(() => {
    if (!isLoading) {
      if (!hasOnboarded) {
        router.replace("/onboarding");
      } else if (!user) {
        router.replace("/(auth)/login");
      }
      // If user exists, AuthContext will handle role-based redirect
      else {
        switch (user?.role) {
          case "employee":
            router.replace("/(employee)/problem");
            break;

          case "customer":
          default:
            router.replace("/(customer)/chatlist");
            break;

          case "admin":
            router.replace("/(admin)/problem");
            break;
        }
      }
    }
  }, [isLoading, hasOnboarded, user]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
}
