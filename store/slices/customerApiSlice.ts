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
  }),

  overrideExisting: true,
});

export const { useUpdateProfileMutation } = customerApiSlice;
