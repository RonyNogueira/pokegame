import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  isEdit: false,
  isNew: false,
};

export const openModal = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.open = !state.open;
      if (action.payload) state.isEdit = action.payload.isEdit;
      if (action.payload) state.isNew = action.payload.isNew;
    },
  },
});

export const { toggle } = openModal.actions;

export default openModal.reducer;
