import { GetProblemListResponse } from "@/types";
import { apiSlice } from "../apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/",
      providesTags: [{ type: "Problem", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProblemListQuery } = adminApiSlice;
