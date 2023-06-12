import { Routes } from "@angular/router";
import { MoviesComponent } from "./movies.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { ViewedMoviesComponent } from "./components/viewed-movies/viewed-movies.component";

const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'history',
    component: ViewedMoviesComponent,
  },
  {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
  },
];

export default MOVIES_ROUTES;
