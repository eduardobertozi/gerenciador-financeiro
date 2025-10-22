import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create/create.component').then((m) => m.CreateComponent),
  },
] as Routes;
