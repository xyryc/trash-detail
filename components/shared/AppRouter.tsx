// components/AppRouter.tsx
import SplashScreen from "@/app/splash";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized, user } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  // Initialize auth on app start
  useAuthInit();

  // Handle splash screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation after splash is hidden
  useEffect(() => {
    if (!showSplash && isInitialized) {
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
  }, [showSplash, isInitialized, isAuthenticated, user]);

  // Show splash screen for 2 seconds
  if (showSplash) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AppRouter;
