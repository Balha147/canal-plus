import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT, BASE_URL, HTTP_OPTIONS } from 'src/app/shared/config/api-end-point.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(body: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${BASE_URL}${API_END_POINT.loginUrl}`, body, HTTP_OPTIONS);
  }
}
