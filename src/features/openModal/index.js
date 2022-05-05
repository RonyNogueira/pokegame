import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const openModal = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    toggle: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggle } = openModal.actions;

export default openModal.reducer;
