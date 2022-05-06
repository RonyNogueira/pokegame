import { configureStore } from "@reduxjs/toolkit";
import openModalReducer from "../features/openModal";
import pokemonReducer from "../features/pokemon";

export const store = configureStore({
  reducer: {
    openModal: openModalReducer,
    pokemonData: pokemonReducer,
  },
});
