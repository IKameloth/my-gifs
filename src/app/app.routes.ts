import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),
  },
  {
    path: 'dashboard',
    // --> without default export class component <--
    // loadComponent: () =>
    //   import('./gifs/pages/dashboard-page/dashboard-page.component').then(
    //     (component) => component.DashboardPageComponent,
    //   ),
    // --> with export default class component <--
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history-page/gif-history-page.component'),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
