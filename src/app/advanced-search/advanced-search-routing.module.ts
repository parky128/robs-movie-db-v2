import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvancedSearchComponent } from './advanced-search.component';
import { AdvancedSearchRouteResolver } from './advanced-search-routing.resolver';

export const AdvancedSearchRoutes: Routes = [
  {
    path: '',
    component: AdvancedSearchComponent,
    resolve: {
      genres: AdvancedSearchRouteResolver
    },
    runGuardsAndResolvers: 'always'
  }
];

