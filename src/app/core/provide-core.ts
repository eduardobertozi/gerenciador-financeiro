import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { setAuthTokenInterceptor } from './auth/interceptors/set-auth-token-interceptor';
import { provideAuth } from './auth/provide-auth';

registerLocaleData(ptBr);

export function provideCore() {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
    provideEnvironmentNgxMask({
      thousandSeparator: '.',
      decimalMarker: ',',
    }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      } as MatSnackBarConfig,
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    provideAuth(),
  ]);
}
