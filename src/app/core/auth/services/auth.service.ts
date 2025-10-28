import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../interfaces/user';
import { UserCredentials } from '../interfaces/user-credentials';

function generateToken(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(payload: UserCredentials): Observable<AuthTokenResponse> {
    // Simulação de uma chamada HTTP para autenticação.
    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: generateToken() });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refreshToken(token: string): Observable<AuthTokenResponse> {
    // Aqui seria feita a chamada para o endpoint de refresh token.
    return of({ token: generateToken() });
  }
}
