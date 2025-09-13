import {
  GetCustomerListResponse,
  GetProblemListResponse,
  UploadImageResponse,
} from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/my-created-problems",
      providesTags: [{ type: "Problem", id: "EMPLOYEE" }],
    }),

    getProblemById: builder.query({
      query: (problemId) => `/problems/${problemId}`,
      providesTags: (problemId) => [{ type: "Problem" }],
    }),

    updateProblem: builder.mutation({
      query: ({ problemId, payload }) => ({
        url: `/problems/update/${problemId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { problemId }) => [{ type: "Problem" }],
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

    updateProfile: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: payload,
      }),
      async onQueryStarted({ userId, payload }, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response.success) {
            // Update AsyncStorage
            await AsyncStorage.setItem(
              "user_data",
              JSON.stringify(response.data)
            );

            // Invalidate specific profile cache
            dispatch(
              apiSlice.util.invalidateTags([
                { type: "Profile", id: "CURRENT_USER" },
              ])
            );
          }
        } catch (error) {
          console.error("Profile update error:", error);
        }
      },
      invalidatesTags: [{ type: "Profile", id: "CURRENT_USER" }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCustomerListQuery,
  useCreateProblemMutation,
  useUploadImageMutation,
  useGetProblemListQuery,
  useGetProblemByIdQuery,
  useUpdateProblemMutation,
  useUpdateProfileMutation,
} = employeeApiSlice;
