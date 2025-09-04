import {
  GetCustomerListResponse,
  GetProblemListResponse,
  UploadImageResponse,
} from "@/types";
import { apiSlice } from "../apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.userId}`,
        method: "PATCH",
        body: {
          name: payload.name,
          number: payload.number,
          addressLane1: payload.addressLane1,
          addressLane2: payload.addressLane2,
          city: payload.city,
          state: payload.state,
          zipCode: payload.zipCode,
        },
      }),
    }),

    getProblemList: builder.query<GetProblemListResponse, void>({
      query: () => "/problems/my-created-problems",
      providesTags: [{ type: "Problem", id: "LIST" }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCustomerListQuery,
  useCreateProblemMutation,
  useUploadImageMutation,
  useUpdateProfileMutation,
  useGetProblemListQuery,
} = employeeApiSlice;
