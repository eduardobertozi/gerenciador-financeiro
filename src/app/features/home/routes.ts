import { Routes } from "@angular/router";

export default <Routes>[
  {
    path: '',
    loadComponent: () => import('./home').then((m) => m.Home)
  }
]