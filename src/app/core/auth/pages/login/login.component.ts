import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthTokenResponse } from '../../interfaces/auth-token-response';
import { UserCredentials } from '../../interfaces/user-credentials';
import { AuthTokenStorageService } from '../../services/auth-token-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  authTokenStorageService = inject(AuthTokenStorageService);

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = {
      user: this.form.value.user!,
      password: this.form.value.password!,
    };

    this.authService.login(payload).subscribe({
      next: (response: AuthTokenResponse) => {
        this.router.navigate(['']);
        this.authTokenStorageService.set(response.token);
      },
      error: (response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.form.setErrors({
            wrongCredentials: true,
          });
        }
      },
    });
  }
}
