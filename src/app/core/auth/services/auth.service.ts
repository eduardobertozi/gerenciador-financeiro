import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../interfaces/user';
import { UserCredentials } from '../interfaces/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(payload: UserCredentials): Observable<AuthTokenResponse> {
    // Simulação de uma chamada HTTP para autenticação.
    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: 'fake-token' });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
        }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCurrentUser(_token: string): Observable<User> {
    // Aqui seria feita a decodificação do token e uma requisição para obter os dados do usuário.

    return of({
      username: 'admin',
    });
  }
}
