import { configureStore } from "@reduxjs/toolkit";
import openModalReducer from "../features/openModal";

export const store = configureStore({
  reducer: {
    openModal: openModalReducer,
  },
});
