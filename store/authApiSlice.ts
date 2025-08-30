import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "./apiSlice";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "employee" | "admin";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem("auth_token", data.token);
          await AsyncStorage.setItem("user_data", JSON.stringify(data.user));
        } catch (error) {
          console.error("Login storage error:", error);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout API error:", error);
        } finally {
          await AsyncStorage.removeItem("auth_token");
          await AsyncStorage.removeItem("user_data");
        }
      },
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } =
  authApiSlice;
