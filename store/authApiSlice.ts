import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "./apiSlice";

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
          // console.log("from auth redux", data.user)
          await AsyncStorage.setItem("auth_token", data.accessToken);
          await AsyncStorage.setItem("user_data", JSON.stringify(data.user));
        } catch (error) {
          console.error("Login storage error:", error);
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
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useSetNewPasswordMutation,
} = authApiSlice;
