import { GetProblemListResponse } from "@/types";
import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/admin",
      providesTags: [{ type: "Problem", id: "ADMIN" }],
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
  }),
  overrideExisting: true,
});

export const {
  useGetProblemListQuery,
  useGetProblemByIdQuery,
  useUpdateProblemStatusMutation,
  useUpdateProblemMutation,
  useGetUserListQuery,
} = adminApiSlice;
