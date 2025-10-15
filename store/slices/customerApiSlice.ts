import { apiSlice } from "../apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: () => [{ type: "User" }],
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
