import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApikey = process.env.REACT_APP_TMDB_KEY;

const page = 1;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApikey}`,
    }),

    // Get Movies
    getMovies: builder.query({
      query: ({ genreCategoryName, page }) => {
        if (genreCategoryName && typeof genreCategoryName === "string") {
          return `movie/${genreCategoryName}?page=${page}&api_key=${tmdbApikey}`;
        }

        if (genreCategoryName && typeof genreCategoryName === "number") {
          return `discover/movie?with_genres=${genreCategoryName}&page=${page}&api_key=${tmdbApikey}`;
        }
        return `movie/popular?page=${page}&api_key=${tmdbApikey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;