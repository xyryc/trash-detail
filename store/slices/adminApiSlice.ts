import { GetProblemListResponse } from "@/types";
import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/admin",
      providesTags: [{ type: "Problem", id: "LIST" }],
    }),

    getProblemById: builder.query({
      query: (problemId) => `/problems/${problemId}`,
      providesTags: (problemId) => [{ type: "Problem" }],
    }),

    updateProblemStatus: builder.mutation({
      query: ({ problemId, payload }) => ({
        url: `/problems/status/${problemId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { problemId }) => [{ type: "Problem" }],
    }),

    updateProblem: builder.mutation({
      query: ({ problemId, payload }) => ({
        url: `/problems/update/${problemId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { problemId }) => [{ type: "Problem" }],
    }),

    getUserList: builder.query({
      query: (role) => `/users?role=${role}`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: (userId) => [{ type: "User", id: userId }],
    }),

    updateProfile: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: () => [{ type: "User" }],
    }),

    inviteUser: builder.mutation({
      query: (payload) => ({
        url: "/users/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),

    closeSupport: builder.mutation({
      query: ({ supportId }) => ({
        url: `/supports/close/${supportId}`,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAdminProblemListQuery,
  useGetProblemByIdQuery,
  useUpdateProblemStatusMutation,
  useUpdateProblemMutation,
  useGetUserListQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useInviteUserMutation,
  useCloseSupportMutation,
} = adminApiSlice;
