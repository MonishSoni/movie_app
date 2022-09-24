import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/tmdb";
import genreCategoryReducer from "../features/currentCategory";

import auth from "../features/auth";
export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    genreCategory: genreCategoryReducer,
    user: auth,
  },
});
