import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Person } from '../models/Person.model';

import { TmdbPersonService } from '../services/tmdb-person/tmdb-person.service';

@Injectable()
export class PersonRouteResolver implements Resolve<Person> {
  constructor(private tmdbPersonService: TmdbPersonService) {}

  resolve(activateRoute: ActivatedRouteSnapshot) {
    return this.tmdbPersonService.getPerson(activateRoute.paramMap.get('id') ?? '');
  }
}
