import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem("auth_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      console.log("NO TOKEN FOUND!");
    }

    headers.set("content-type", "application/json");

    return headers;
  },
});

// @ts-ignore
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired, logout user
    await AsyncStorage.removeItem("auth_token");
    await AsyncStorage.removeItem("user_data");
    // Navigate to login screen here if needed
  }

  return result;
};

// Add error handling wrapper
// @ts-ignore
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  console.log("=== API CALL ===");
  console.log("Endpoint:", args);

  const result = await baseQuery(args, api, extraOptions);

  console.log("API Response:", {
    data: result.data,
    error: result.error,
    meta: result.meta,
  });
  console.log("================");

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Customer",
    "Employee",
    "Admin",
    "Chat",
    "Problem",
    "Profile",
    "Message",
    "ChatHistory",
    "ChatList",
  ],
  endpoints: () => ({}),
});
