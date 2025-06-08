import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/moviesSlice';
import favoritesReducer from './features/favoritesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});

export default store;
