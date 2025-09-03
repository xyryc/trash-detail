import { apiSlice } from "../apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerList: builder.query({
      query: () => "/users?role=customer",
    }),
  }),

  overrideExisting: true,
});

export const { useGetCustomerListQuery } = employeeApiSlice;
