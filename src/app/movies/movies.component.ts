import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { Observable, delay, map, of, switchMap, tap } from 'rxjs';
import { MovieModel, MovieTransformerModel } from './models/movies.model';
import { MoviesService } from './services/movies.service';
import { MovieRawComponent } from './components/movie-raw/movie-raw.component';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransformerDataUtils } from '../shared/utils/transformer-data.utils';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { Store } from '@ngrx/store';
import { setLastSearch } from './services/movies-store/movies.actions';
import { MoviesState } from './services/movies-store/movies.store';
import { IMAGES_MOVIES } from './config/image-src.config';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  standalone: true,
  imports: [
    MovieRawComponent,
    SearchMovieComponent,
    NgxPaginationModule,
    NgIf,
    NgFor,
    AsyncPipe,
    LoaderComponent,
    JsonPipe
  ],
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {

  private moviesService = inject(MoviesService);

  private store = inject(Store<MoviesState>);

  movies$!: Observable<MovieTransformerModel[]>;

  pageSize = 6; // Nombre d'éléments à afficher par page

  totalItems!: number;

  currentPage = 1 // la page courante

  isLoading = false

  ngOnInit(): void {
    this.store.select((state) => state.movies?.lastSearch).subscribe((lastSearch) => {
      if (lastSearch) {
        this.movies$ = of(lastSearch);
      } else {
        this.loadMovies();
      }
    });
  }

  loadMovies(): void {
    this.movies$ = this.transformerMoviesData(this.moviesService.loadMovies());
  }

  getMoviesSearched(event: { searchQuery: string, sortBy: string }): void {
    const { searchQuery, sortBy } = event;
    this.isLoading = true;
    this.movies$ = this.moviesService.getMovies(searchQuery, sortBy).pipe(
      tap(() => this.isLoading = true),
      delay(1000),
      switchMap((movies: MovieTransformerModel[]) => {
       return this.transformerMoviesData(of(movies));
      }),
      tap((movies: MovieTransformerModel[]) => {
        this.isLoading = false;
        this.store.dispatch(setLastSearch(movies, searchQuery, sortBy));
      })
    );
  }

  /**
   * transformerMoviesData permet de suppromer les espaces dans les keys des objets envoyer par le backend
   * pour qu'on puisse bien afficher les donner dans la template
   */
  transformerMoviesData(data: Observable<MovieModel[]>): Observable<MovieTransformerModel[]> {
    return data.pipe(
      map((movies) => {
        return movies.map((movie, index) => {
          const imageIndex = index < IMAGES_MOVIES.length ? index : IMAGES_MOVIES.length - 1;
          const newMovie = { ...movie, image: IMAGES_MOVIES[imageIndex] };
          TransformerDataUtils.removeSpaces(newMovie);
          return newMovie;
        });
      })
    );
  }

}
