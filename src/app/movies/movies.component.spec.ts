import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from './services/movies.service';
import { Store, StoreModule } from '@ngrx/store';
import { moviesReducer } from './services/movies-store/movies.reducer';
import { MoviesState } from './services/movies-store/movies.store';
import { Subject, of, take } from 'rxjs';
import { MovieModel, MovieTransformerModel } from './models/movies.model';
import { setLastSearch } from './services/movies-store/movies.actions';


describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
  let store: Store<MoviesState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, StoreModule.forRoot({ movies: moviesReducer })],
     });
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    store = TestBed.inject(Store<MoviesState>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load movies on component initialization if last search is not available', () => {
    const loadMoviesSpy = spyOn(component, 'loadMovies');
    spyOn(store, 'select').and.returnValue(of(null));

    component.ngOnInit();

    expect(loadMoviesSpy).toHaveBeenCalled();
  });

  it('should load last search movies on component initialization if available', () => {
    const movies: MovieTransformerModel[] = [
    {
     id: 1,
     Title: 'Film-1',
     IMDBRating: 4.4,
    },
    {
     id: 2,
     Title: 'Film-2',
     IMDBRating: 5.4,
    },
    ];

    const moviesSubject = new Subject<MovieTransformerModel[]>();
    spyOn(store, 'select').and.returnValue(moviesSubject.asObservable());

    component.ngOnInit();
    moviesSubject.next(movies); // Émettre la valeur attendue

    component.movies$.pipe(take(1)).subscribe((emittedMovies) => {
      expect(emittedMovies).toEqual(movies);
    });
  });
  it('should transform movies data correctly', async () => {
    const movies: MovieModel[] = [
      {
        id: 1,
        Title: 'Film-1',
        'IMDB Rating': 4.4,
      },
      {
        id: 2,
        Title: 'Film-2',
        'IMDB Rating': 5.4,
      },
    ];
    const transformedMovies: MovieTransformerModel[] = [
      {
        id: 1,
        Title: 'Film-1',
        IMDBRating: 4.4,
        image: './assets/images/film_1.jpg', // Ajouter la propriété image
      },
      {
        id: 2,
        Title: 'Film-2',
        IMDBRating: 5.4,
        image: './assets/images/film_2.jpg', // Ajouter la propriété image
      },
    ];
    spyOn(moviesService, 'loadMovies').and.returnValue(of(movies));

    component.loadMovies();

    const actualMovies = await component.movies$.toPromise();
    expect(actualMovies).toEqual(transformedMovies);
  });

});
