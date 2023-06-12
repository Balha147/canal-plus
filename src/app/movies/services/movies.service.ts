import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, API_END_POINT, HTTP_OPTIONS } from 'src/app/shared/config/api-end-point.config';
import { MovieModel } from '../models/movies.model';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private http = inject(HttpClient);

  loadMovies(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(`${BASE_URL}${API_END_POINT.listMoviesUrl}`, HTTP_OPTIONS)
  }

  getMovies(query?: string, sortBy?: string): Observable<MovieModel[]> {
    const params = new HttpParams()
      .append('query', query ?? '')
      .append('sortBy', sortBy ?? '');

    return this.http.get<MovieModel[]>(`${BASE_URL}${API_END_POINT.listMoviesUrl}`, { params });
  }

  getMovieDetails(id: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${BASE_URL}${API_END_POINT.listMoviesUrl}/${id}`);
  }
}
