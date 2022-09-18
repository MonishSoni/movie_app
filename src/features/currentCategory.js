import { createSlice } from "@reduxjs/toolkit";

export const genreCategory = createSlice({
  name: "genreCategory",
  initialState: {
    genreCategoryName: "",
    page: 1,
    searchQuery: "",
  },

  reducers: {
    selectGenreCategory: (state, action) => {
      state.genreCategoryName = action.payload;
    },
  },
});

export const { selectGenreCategory } = genreCategory.actions;

export default genreCategory.reducer;
