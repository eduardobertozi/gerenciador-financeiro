import { Routes } from '@angular/router';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-or-edit/create-or-edit.component').then(
        (m) => m.CreateOrEditComponent,
      ),
  },
  {
    path: 'edit/:id',
    resolve: {
      transaction: getTransactionByIdResolver,
    },
    loadComponent: () =>
      import('./pages/create-or-edit/create-or-edit.component').then(
        (m) => m.CreateOrEditComponent,
      ),
  },
] as Routes;
