import { createSlice } from "@reduxjs/toolkit";
import questionMark from "../../assets/img/question-mark.png";

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
  listPokemon: [],
};

export const pokemonData = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    setListPokemon: (state, action) => {
      state.listPokemon.push(action.payload);
    },
    orderPokemon: (state, action) => {
      const questionMark = state.listPokemon.findIndex(
        (pokemon) => pokemon.isEmpty
      );
      state.listPokemon[questionMark] = action.payload;
    },
    releasePokemon: (state, action) => {
      const pokemons = state.listPokemon.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
      pokemons.push({
        image: questionMark,
        isEmpty: true,
      });
      state.listPokemon = pokemons;
    },
    changePokemonName: (state, action) => {
      const pokemonIndex = state.listPokemon.findIndex(
        (pokemon) => pokemon.id === state.pokemon.id
      );
      state.pokemon.name = action.payload;
      state.listPokemon[pokemonIndex] = state.pokemon;
    },
  },
});

export const {
  setPokemon,
  setListPokemon,
  orderPokemon,
  releasePokemon,
  changePokemonName,
} = pokemonData.actions;

export default pokemonData.reducer;
