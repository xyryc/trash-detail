import { useAppDispatch } from "@/store/hooks";
import {
  logout,
  setCredentials,
  setInitialized,
} from "@/store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const userData = await AsyncStorage.getItem("user_data");

      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch(setCredentials({ user, token }));

        // Optionally validate token with server
        // The validateTokenQuery will handle updating state if token is invalid
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      dispatch(logout());
    } finally {
      dispatch(setInitialized());
    }
  };
};
