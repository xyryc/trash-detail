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
  }),

  overrideExisting: true,
});

export const {
  useGetCustomerListQuery,
  useCreateProblemMutation,
  useUploadImageMutation,
} = employeeApiSlice;
