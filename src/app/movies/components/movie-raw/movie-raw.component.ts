import { Component, Input, inject } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { MovieTransformerModel } from '../../models/movies.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { viewMovie } from '../../services/movies-store/movies.actions';
import { MoviesState } from '../../services/movies-store/movies.store';
import { take } from 'rxjs';
import { IMAGES_MOVIES } from '../../config/image-src.config';

@Component({
  selector: 'app-movie-raw',
  standalone: true,
  imports: [CommonModule, RatingComponent, DatePipe, NgIf, JsonPipe],
  templateUrl: './movie-raw.component.html',
  styleUrls: ['./movie-raw.component.scss'],
})
export class MovieRawComponent {

  private router = inject(Router);

  private activateRoute = inject(ActivatedRoute);

  private store = inject(Store<MoviesState>);

  @Input() moviesData!: MovieTransformerModel;


  navigateTo(movie: MovieTransformerModel): void {
    this.router.navigate(['movie-details', this.moviesData?.id], { relativeTo: this.activateRoute });
    this.updateHistoryStore(movie)
  }

  private updateHistoryStore(movie: MovieTransformerModel): void {
    this.store.select((state) => state.movies.viewedMovies).pipe(
      take(1) // Permet de s'abonner une seule fois et se désabonner ensuite
    ).subscribe((movies: any[]) => {
      const isMoviePresent = movies.find((value: any) => value.id === movie.id);
      if (!isMoviePresent) {
        this.store.dispatch(viewMovie(movie));
      }
    });
  }
}
