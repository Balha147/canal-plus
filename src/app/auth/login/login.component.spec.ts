import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../../shared/service/storage.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
     });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate to /movies on successful login', () => {
    const loginResponse = { token: 'votre-token' };

    spyOn(authService, 'login').and.returnValue(of(loginResponse));
    spyOn(storageService, 'saveUser');
    spyOn(router, 'navigate');

    fixture.detectChanges();

    const usernameControl = component.form.get('username') as FormControl;
    const passwordControl = component.form.get('password') as FormControl;
    usernameControl.setValue('testuser');
    passwordControl.setValue('testpassword');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    expect(storageService.saveUser).toHaveBeenCalledWith('token', jasmine.objectContaining({ token: 'votre-token' }));
    expect(router.navigate).toHaveBeenCalledWith(['/movies']);
  });

  it('should set the error message on login error', () => {
    const error = { error: { err: 'Invalid credentials' } };
    spyOn(authService, 'login').and.returnValue(throwError(error));

    const usernameControl = component.form.get('username') as FormControl;
    const passwordControl = component.form.get('password') as FormControl;
    usernameControl.setValue('Canal-plus');
    passwordControl.setValue('Super-secret');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ username: 'Canal-plus', password: 'Super-secret' });
    expect(component.errorMessage).toEqual('Ouupss !!! Invalid credentials');
  });
});
