import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { TmdbTvService } from '../services/tmdb-tv/tmdb-tv.service';

@Injectable()
export class TvRouteResolver implements Resolve<any> {
  constructor(private tmdbTvService: TmdbTvService) {}

  resolve(activateRoute: ActivatedRouteSnapshot) {
    return this.tmdbTvService.getTv(activateRoute.paramMap.get('id') ?? '');
  }
}
