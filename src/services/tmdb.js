import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApikey = process.env.REACT_APP_TMDB_KEY;

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
      query: ({ genreCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApikey}`;
        }
        if (genreCategoryName && typeof genreCategoryName === "string") {
          return `movie/${genreCategoryName}?page=${page}&api_key=${tmdbApikey}`;
        }

        if (genreCategoryName && typeof genreCategoryName === "number") {
          return `discover/movie?with_genres=${genreCategoryName}&page=${page}&api_key=${tmdbApikey}`;
        }
        return `movie/popular?page=${page}&api_key=${tmdbApikey}`;
      },
    }),

    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApikey}`,
    }),

    // get user specific query

    getRecommendation: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApikey}`,
    }),

    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApikey}`,
    }),

    getActormov: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApikey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
  useGetActorQuery,
  useGetActormovQuery,
} = tmdbApi;
