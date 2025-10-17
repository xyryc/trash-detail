import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetLoggedInUserDataResponse,
  LoginRequest,
  LoginResponse,
  SetNewPasswordRequest,
  SetNewPasswordResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../apiSlice";
import { logout as logoutAction, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("from auth redux", data.user)
          await AsyncStorage.setItem("auth_token", data.accessToken);
          await AsyncStorage.setItem("user_data", JSON.stringify(data.user));

          // Update Redux state
          dispatch(
            setCredentials({
              user: data.user,
              token: data.accessToken,
            })
          );
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout API error:", error);
        } finally {
          // Clear storage and Redux state
          await AsyncStorage.removeItem("auth_token");
          await AsyncStorage.removeItem("user_data");

          // Clear RTK Query cache
          dispatch(apiSlice.util.resetApiState());

          // Clear Redux state
          dispatch(logoutAction());
        }
      },
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (code) => ({
        url: "/auth/verify-reset-code",
        method: "POST",
        body: code,
      }),
    }),

    setNewPassword: builder.mutation<
      SetNewPasswordResponse,
      SetNewPasswordRequest
    >({
      query: (credential) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: credential,
      }),
    }),

    getLoggedInUserData: builder.query<GetLoggedInUserDataResponse, void>({
      query: () => "/users/me",
      providesTags: [{ type: "Profile", id: "CURRENT_USER" }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useSetNewPasswordMutation,
  useGetLoggedInUserDataQuery,
} = authApiSlice;
