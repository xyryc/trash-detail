import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

    getProblemById: builder.query({
      query: (problemId) => `/problems/${problemId}`,
      providesTags: (problemId) => [{ type: "Problem" }],
    }),

    createCustomerSupportChat: builder.mutation({
      query: (payload) => ({
        url: "/supports",
        method: "POST",
        body: payload,
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useUpdateProfileMutation,
  useGetProblemByIdQuery,
  useCreateCustomerSupportChatMutation,
} = customerApiSlice;
