import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemon: {
    id: 0,
    name: "",
    image: "",
    types: [],
    hp: 0,
    height: 0,
    weight: 0,
  },
};

export const pokemonData = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

export const { setPokemon } = pokemonData.actions;

export default pokemonData.reducer;
