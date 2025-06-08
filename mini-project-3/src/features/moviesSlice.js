import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "a6f903cc";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchTerm, page = 1 }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`
      );
      if (res.data.Response === "True") {
        return { movies: res.data.Search, page };
      } else {
        return thunkAPI.rejectWithValue(res.data.Error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );
      if (res.data.Response === "True") {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.Error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchTerm: "",
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentPage = action.payload.page;

        state.movies =
          action.payload.page === 1
            ? action.payload.movies
            : [...state.movies, ...action.payload.movies];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export const { setSearchTerm, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
