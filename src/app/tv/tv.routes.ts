import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TvComponent } from './tv.component';
import { TvRouteResolver } from './tv-routing.resolver';

export const TvRoutes: Routes = [
  {
    path: ':id',
    component: TvComponent,
    resolve: {
      tvShow: TvRouteResolver
    },
    runGuardsAndResolvers: 'always'
  }
];
