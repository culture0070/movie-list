// src/api/tmdbApi.ts
import { TMDB_API_KEY, TMDB_API_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: TMDB_API_URL,
    }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query<any, void>({
            query: () => `/movie/popular?api_key=${TMDB_API_KEY}`,
        }),
        getTrendingMovies: builder.query<any, void>({
            query: () => `/trending/movie/week?api_key=${TMDB_API_KEY}`,
        }),
        searchMovies: builder.query<any, string>({
            query: (query: string) =>
                `/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
        }),
        getMovieDetails: builder.query<any, number>({
            query: (movieId: number) =>
                `/movie/${movieId}?api_key=${TMDB_API_KEY}`,
        }),
    }),
});

export const {
    useGetPopularMoviesQuery,
    useGetTrendingMoviesQuery,
    useSearchMoviesQuery,
    useGetMovieDetailsQuery,
} = tmdbApi;
