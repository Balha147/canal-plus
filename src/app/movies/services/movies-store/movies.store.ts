import { MovieTransformerModel } from "../../models/movies.model";

export interface MoviesState {
  lastSearch: MovieTransformerModel[] | null;
  lastSearchQuery?: string | null;
  lastSortBy?: string | null;
  viewedMovies: MovieTransformerModel[];
}
