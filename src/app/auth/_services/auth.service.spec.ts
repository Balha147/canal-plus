import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { API_END_POINT, BASE_URL } from 'src/app/shared/config/api-end-point.config';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to login API and return a token', () => {
    const mockResponse = { token: 'mock-token' };
    const loginData = { username: 'testuser', password: 'testpassword' };

    authService.login(loginData).subscribe(response => {
      expect(response.token).toBe('mock-token');
    });

    const req = httpMock.expectOne(`${BASE_URL}${API_END_POINT.loginUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);

    req.flush(mockResponse);
  });
});
