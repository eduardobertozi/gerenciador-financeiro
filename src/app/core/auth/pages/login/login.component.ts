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
import { switchMap, tap } from 'rxjs';
import { UserCredentials } from '../../interfaces/user-credentials';
import { AuthTokenStorageService } from '../../services/auth-token-storage.service';
import { AuthService } from '../../services/auth.service';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store.service';

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
  loggedInUserStoreService = inject(LoggedInUserStoreService);

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

    this.authService
      .login(payload)
      .pipe(
        tap((res) => this.authTokenStorageService.set(res.token)),
        switchMap((res) => this.authService.getCurrentUser(res.token)),
        tap((user) => this.loggedInUserStoreService.setUser(user)),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (res: HttpErrorResponse) => {
          if (res.status === 401) {
            this.form.setErrors({
              wrongCredentials: true,
            });
          }
        },
      });
  }
}
