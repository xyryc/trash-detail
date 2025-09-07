import { useAuthInit } from "@/hooks/useAuthInit";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import SplashScreen from "./SplashScreen";

const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized, user } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  // Initialize auth on app start
  useAuthInit();

  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated && user) {
        // Navigate based on user role
        if (user.role === "customer") {
          router.replace("/(customer)/chatlist");
        } else if (user.role === "employee") {
          router.replace("/(employee)/problem");
        } else if (user.role === "admin" || user.role === "superadmin") {
          router.replace("/(admin)/problem");
        }
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [isInitialized, isAuthenticated, user]);

  // Show custom splash screen while initializing
  if (!isInitialized) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AppRouter;
