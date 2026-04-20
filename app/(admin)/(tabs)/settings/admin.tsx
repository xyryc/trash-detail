import { useGetLoggedInUserDataQuery } from "@/store/slices/authApiSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import SettingsScreen from "./_SettingsScreen";

export default function SettingsAdmin() {
  const router = useRouter();
  const { data: loggedInUser, isLoading } = useGetLoggedInUserDataQuery();

  useEffect(() => {
    if (isLoading) return;
    if (loggedInUser?.data?.role !== "superadmin") {
      router.replace("/(admin)/(tabs)/settings");
    }
  }, [isLoading, loggedInUser?.data?.role, router]);

  return <SettingsScreen screenType="superadmin" />;
}

