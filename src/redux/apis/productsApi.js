import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./fetchBaseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: ({ keyword, isPublished }) => ({
        url: "services/app/Product/SearchProduct",
        method: "GET",
        params: { keyword, isPublished },
      }),
    }),
  }),
});

export const { useSearchProductQuery } = productsApi;
