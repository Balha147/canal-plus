import { createAction } from "@ngrx/store";
import { MovieTransformerModel } from "../../models/movies.model";

export const setLastSearch = createAction(
  '[Movies] Set Last Search',
  (movies: MovieTransformerModel[], searchQuery: string, sortBy: string) => ({
    movies,
    searchQuery,
    sortBy
  })
);

export const viewMovie = createAction(
  '[Movies] View Movie',
  (movie: MovieTransformerModel) => ({ movie })
);
