import { apiSlice } from "../apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notifications",
      //   providesTags: () => [{ type: "Notification" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetNotificationsQuery } = notificationApiSlice;
