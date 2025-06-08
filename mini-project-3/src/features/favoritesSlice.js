import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find(m => m.imdbID === action.payload.imdbID)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) =>
      state.filter(m => m.imdbID !== action.payload),
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
