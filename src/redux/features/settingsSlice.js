import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isOpenMobileMenu: false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.isOpenMobileMenu = !state.isOpenMobileMenu;
    },
  },
});

export const { toggleMobileMenu } = settingsSlice.actions;
export default settingsSlice.reducer;
