import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes'),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes'),
  },
];
