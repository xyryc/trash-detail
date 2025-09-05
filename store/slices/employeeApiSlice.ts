import {
  GetCustomerListResponse,
  GetLoggedInUserDataResponse,
  GetProblemListResponse,
  UploadImageResponse,
} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/my-created-problems",
      providesTags: [{ type: "Problem", id: "LIST" }],
    }),

    getCustomerList: builder.query<GetCustomerListResponse, void>({
      query: () => "/users?role=customer",
      providesTags: [{ type: "Customer", id: "LIST" }],
    }),

    createProblem: builder.mutation({
      query: (payload) => ({
        url: "/problems/",
        method: "POST",
        body: payload,
      }),
    }),

    uploadImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),

    getLoggedInUserData: builder.query<GetLoggedInUserDataResponse, void>({
      query: () => "/users/me",
      providesTags: [{ type: "User" }],
    }),

    updateProfile: builder.mutation({
      query: ({ currentUserDBId, payload }) => ({
        url: `/users/${currentUserDBId}`,
        method: "PATCH",
        body: payload,
      }),
      async onQueryStarted({ currentUserDBId, payload }, { queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response.success) {
            // Update stored user data
            await AsyncStorage.setItem(
              "user_data",
              JSON.stringify(response.data)
            );
          }
        } catch (error) {
          console.error("Profile update storage error:", error);
        }
      },
      invalidatesTags: (result, error, { currentUserDBId }) => [
        { type: "User" },
      ],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCustomerListQuery,
  useCreateProblemMutation,
  useUploadImageMutation,
  useGetProblemListQuery,
  useGetLoggedInUserDataQuery,
  useUpdateProfileMutation,
} = employeeApiSlice;
