import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../../shared/service/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
})
export class LoginComponent {

  form: FormGroup = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string = '';

  private authService = inject(AuthService);

  private storageService = inject(StorageService);

  private router = inject(Router);

  onSubmit(): void {
   this.authService.login(this.form?.value).subscribe({
      next: data => {
        this.storageService.saveUser('token',data);
        this.router.navigate(['/movies']);
      },
      error: err => {
        this.errorMessage = `Ouupss !!! ${err.error.err}`;
      }
    });
  }
}
