import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  isEdit: false,
};

export const openModal = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.open = !state.open;
      if (action.payload) state.isEdit = action.payload.isEdit;
    },
  },
});

export const { toggle } = openModal.actions;

export default openModal.reducer;
