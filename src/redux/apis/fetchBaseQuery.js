import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
const baseURL = import.meta.env.VITE_BASE_URL;

export const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("ProjectId", import.meta.env.VITE_PROJECT_ID);
    }
    return headers;
  },
});
