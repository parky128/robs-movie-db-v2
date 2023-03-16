import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'tv',
    loadChildren: () => import('./tv/tv.module').then(m => m.TvModule)
  },
  {
    path: 'advanced-search',
    loadChildren: () => import('./advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
