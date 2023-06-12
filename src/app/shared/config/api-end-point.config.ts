import { HttpHeaders } from "@angular/common/http";

export const BASE_URL = 'http://localhost:3000/';
export const API_END_POINT = {
  loginUrl: 'auth/login',
  listMoviesUrl: 'movies'
}
export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
