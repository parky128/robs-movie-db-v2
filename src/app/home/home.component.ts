import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { MovieSearchResult } from '../models/MovieSearchResult.model';
import { TVSearchResult } from '../models/TVSearchResult.model';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { TmdbTrendingService } from '../services/tmdb-trending/tmdb-trending.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trendingMovies: Array<MovieSearchResult> = [];
  trendingShows: Array<TVSearchResult> = [];

  trendingData$: Observable<{movies: MovieSearchResult[], shows: TVSearchResult[]}>;

  constructor(
    private apiConfigService: ApiConfigService,
    private tmdbTrendingService: TmdbTrendingService
  ) { }

  public posterUrlPath = (posterPath: string) => {
    return this.apiConfigService.getTrendingItemImageUrl(posterPath);
  }

  ngOnInit() {
    this.trendingData$ = combineLatest([
        this.tmdbTrendingService.getWeeklyTrend('movie'),
        this.tmdbTrendingService.getWeeklyTrend('tv')
    ]).pipe(
      map(([movies, shows]) =>({movies: movies.results, shows: shows.results}))
    );
  }

}
