import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    favList: [],
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFavMovies: (state, action) => {
      state.favList = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setMovies, setFilter, setFavMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
