import {
  GetCustomerListResponse,
  GetLoggedInUserDataResponse,
  GetProblemListResponse,
  UploadImageResponse,
} from "@/types";
import { apiSlice } from "../apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/my-created-problems",
      providesTags: [{ type: "Problem", id: "LIST" }],
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

    getLoggedInUserData: builder.query<GetLoggedInUserDataResponse, void>({
      query: () => "/users/me",
      providesTags: [{ type: "Employee", id: "USER" }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCustomerListQuery,
  useCreateProblemMutation,
  useUploadImageMutation,
  useGetProblemListQuery,
  useGetLoggedInUserDataQuery,
} = employeeApiSlice;
