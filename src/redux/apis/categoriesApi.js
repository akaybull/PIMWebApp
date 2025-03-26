import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./fetchBaseQuery";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    searchCategory: builder.query({
      query: ({ Keyword, SkipCount, MaxResultCount, NumberCode }) => {
        // Boş olan parametreleri kaldır
        const params = {};
        if (Keyword) params.Keyword = Keyword;
        if (SkipCount !== undefined) params.SkipCount = SkipCount;
        if (MaxResultCount !== undefined)
          params.MaxResultCount = MaxResultCount;
        if (NumberCode) params.NumberCode = NumberCode;

        return {
          url: "services/app/Category/GetAllCategory",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useSearchCategoryQuery } = categoriesApi;
