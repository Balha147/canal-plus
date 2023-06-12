import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies.service';
import { MovieModel } from '../../models/movies.model';
import { of } from 'rxjs';


describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let moviesService: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
     });
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie details and remove spaces', () => {
    const movieId = 1;
    const movie: MovieModel = {
      id: 1,
      Title: 'test',
    };

    // Spy on getMovieDetails and return a movie
    spyOn(moviesService, 'getMovieDetails').and.returnValue(of(movie));

    component.id = movieId;
    component.loadMovieDetails();

    expect(moviesService.getMovieDetails).toHaveBeenCalledWith(movieId);
    component.movieDetails$.subscribe((result) => {
      // Verify that spaces are removed
      expect(result).toEqual({ ...movie }); // Make sure to update this if necessary
    });
  });
});

