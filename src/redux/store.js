import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import snackbarReducer from "./features/snackbarSlice";
import settingsReducer from "./features/settingsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    settings: settingsReducer,
  },
});

export default store;
