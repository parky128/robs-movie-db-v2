import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Movie } from '../models/Movie.model';

import { TmdbMovieService } from '../services/tmdb-movie/tmdb-movie.service';

@Injectable()
export class MovieRouteResolver implements Resolve<Movie> {
  constructor(private tmdbMovieService: TmdbMovieService) {}

  resolve(activateRoute: ActivatedRouteSnapshot) {
    return this.tmdbMovieService.getMovie(activateRoute.paramMap.get('id') ?? '');
  }
}
