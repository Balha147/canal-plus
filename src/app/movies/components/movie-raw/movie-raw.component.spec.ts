import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRawComponent } from './movie-raw.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesState } from '../../services/movies-store/movies.store';
import { Store, StoreModule } from '@ngrx/store';
import { viewMovie } from '../../services/movies-store/movies.actions';
import { MovieTransformerModel } from '../../models/movies.model';
import { moviesReducer } from '../../services/movies-store/movies.reducer';

describe('MovieRawComponent', () => {
  let component: MovieRawComponent;
  let fixture: ComponentFixture<MovieRawComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let store: Store<MoviesState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [RouterTestingModule, StoreModule.forRoot({ movies: moviesReducer })],
    });
    fixture = TestBed.createComponent(MovieRawComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(Store<MoviesState>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to movie details and dispatch viewMovie', () => {
    const movieData: MovieTransformerModel = { id: 1, Title: 'Movie 1' };

    spyOn(router, 'navigate');
    spyOn(store, 'dispatch');

    component.moviesData = movieData;
    component.navigateTo(movieData);

    expect(router.navigate).toHaveBeenCalledWith(['movie-details', movieData.id], { relativeTo: activatedRoute });
    expect(store.dispatch).toHaveBeenCalledWith(viewMovie(movieData));
  });
});
