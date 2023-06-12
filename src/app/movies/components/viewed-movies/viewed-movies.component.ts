import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MovieTransformerModel } from '../../models/movies.model';
import { Store } from '@ngrx/store';
import { MoviesState } from '../../services/movies-store/movies.store';
import { MovieRawComponent } from '../movie-raw/movie-raw.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchMovieComponent } from '../search-movie/search-movie.component';

@Component({
  selector: 'app-viewed-movies',
  standalone: true,
  imports: [
    CommonModule,
    MovieRawComponent,
    SearchMovieComponent,
    NgxPaginationModule,
    AsyncPipe,
    ],
  templateUrl: './viewed-movies.component.html',
  styleUrls: ['./viewed-movies.component.scss'],
})
export class ViewedMoviesComponent implements OnInit {

  viewedMovies$!: Observable<MovieTransformerModel[]>;

  private store = inject(Store<MoviesState>);

  currentPage: number = 1

  ngOnInit(): void {
    this.viewedMovies$ = this.store.select((state) => state.movies.viewedMovies);
  }

}
