import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import snackbarReducer from "./features/snackbarSlice";
import settingsReducer from "./features/settingsSlice";
import { brandsApi } from "./apis/brandsApi";
import { productsApi } from "./apis/productsApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    settings: settingsReducer,

    [brandsApi.reducerPath]: brandsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brandsApi.middleware, productsApi.middleware),
});

export default store;
