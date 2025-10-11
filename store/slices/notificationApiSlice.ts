import { apiSlice } from "../apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notifications",
      //   providesTags: () => [{ type: "Notification" }],
    }),

    markAsRead: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PATCH",
      }),

      invalidatesTags: () => [{ type: "Notification" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetNotificationsQuery, useMarkAsReadMutation } =
  notificationApiSlice;
