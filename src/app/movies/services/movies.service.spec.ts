import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieModel } from '../models/movies.model';
import { API_END_POINT, BASE_URL } from 'src/app/shared/config/api-end-point.config';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
     });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<MovieModel[]> when calling loadMovies()', () => {
    const dummyMovies: MovieModel[] = [
      { id: 1, Title: 'Film 1' },
      { id: 2, Title: 'Film 2' },
    ];

    service.loadMovies().subscribe(movies => {
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(`${BASE_URL}${API_END_POINT.listMoviesUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });
});
