import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { TmdbTrendingService } from './services/tmdb-trending/tmdb-trending.service';
import { TrendingMoviesResult } from './models/TrendingMoviesResult';

@Injectable()
export class AppRouteShowsResolver implements Resolve<any> {
  constructor(private tmdbTrendingService: TmdbTrendingService) {}

  resolve(activateRoute: ActivatedRouteSnapshot) {
    return this.tmdbTrendingService.getWeeklyTrend('tv').subscribe((trendingResults: TrendingMoviesResult) => {
      return trendingResults.results;
    });
  }
}
