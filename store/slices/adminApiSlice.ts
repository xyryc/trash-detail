import { GetProblemListResponse } from "@/types";
import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/admin",
      providesTags: [{ type: "Problem", id: "LIST" }],
    }),

    getProblemById: builder.query({
      query: (problemId) => `/problems/${problemId}`,
      providesTags: (problemId) => [{ type: "Problem" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProblemListQuery, useGetProblemByIdQuery } = adminApiSlice;
