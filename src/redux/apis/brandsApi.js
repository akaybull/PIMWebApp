import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./fetchBaseQuery";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    searchBrand: builder.query({
      query: ({ keyword }) => ({
        url: "services/app/Brand/GetAllBrand",
        method: "GET",
        params: { keyword },
      }),
    }),
  }),
});

export const { useSearchBrandQuery } = brandsApi;
