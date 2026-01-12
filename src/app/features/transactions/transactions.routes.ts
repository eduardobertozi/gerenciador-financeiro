import { Routes } from '@angular/router';
import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-or-edit/create-or-edit.component').then((m) => m.CreateOrEditComponent),
  },
  {
    path: 'edit/:id',
    resolve: {
      transaction: getTransactionByIdResolver,
    },
    loadComponent: () => import('./pages/create-or-edit/create-or-edit.component').then((m) => m.CreateOrEditComponent),
  },
] as Routes;
