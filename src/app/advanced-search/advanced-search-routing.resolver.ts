import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { TmdbGenreService } from '../services/tmdb-genre/tmdb-genre.service';

@Injectable()
export class AdvancedSearchRouteResolver implements Resolve<any> {
  constructor(private tmdbGenreService: TmdbGenreService) {}

  resolve(activateRoute: ActivatedRouteSnapshot) {
    return this.tmdbGenreService.getGenres();
  }
}
