import { createReducer, on } from "@ngrx/store";
import { setLastSearch, viewMovie } from "./movies.actions";
import { MoviesState } from "./movies.store";

export const moviesReducer = createReducer<MoviesState>(
  {
    lastSearch: null,
    lastSearchQuery: '',
    lastSortBy: '',
    viewedMovies: []
  },
  on(setLastSearch, (state, { movies, searchQuery, sortBy }) => ({
    ...state,
    lastSearch: movies,
    lastSearchQuery: searchQuery,
    lastSortBy: sortBy
  })),
  on(viewMovie, (state, { movie }) => ({
    ...state,
    viewedMovies: [...state.viewedMovies, movie]
  }))
);
