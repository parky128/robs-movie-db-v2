import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './movie.component';
import { MovieRouteResolver } from './movie-routing.resolver';

export const MovieRoutes: Routes = [
  {
    path: ':id',
    component: MovieComponent,
    resolve: {
      movie: MovieRouteResolver
    },
    // runGuardsAndResolvers: 'always'
  }
];
