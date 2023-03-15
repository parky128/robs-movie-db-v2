import { Routes } from '@angular/router';

import { PersonComponent } from './person.component';
import { PersonRouteResolver } from './person-routing.resolver';

export const PersonRoutes: Routes = [
  {
    path: ':id',
    component: PersonComponent,
    resolve: {
      person: PersonRouteResolver
    },
    runGuardsAndResolvers: 'always'
  }
];

