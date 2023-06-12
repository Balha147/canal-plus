import { Component, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';
import { MoviesService } from '../../services/movies.service';
import { Observable, map } from 'rxjs';
import { MovieModel, MovieTransformerModel } from '../../models/movies.model';
import { TransformerDataUtils } from 'src/app/shared/utils/transformer-data.utils';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RatingComponent, JsonPipe],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  private moviesService = inject(MoviesService);

  @Input() id!: number;

  movieDetails$!: Observable<MovieTransformerModel>;

  ngOnInit(): void {
    this.loadMovieDetails();
  }


  loadMovieDetails(): void {
    this.movieDetails$ = this.moviesService.getMovieDetails(this.id).pipe(
      map(movie => {
        const newMovie: MovieModel = { ...movie };
        TransformerDataUtils.removeSpaces(newMovie);
        return newMovie;
      })
    );

  }
}
