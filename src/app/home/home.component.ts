import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieSearchResult } from '../models/MovieSearchResult.model';
import { TrendingMoviesResult } from '../models/TrendingMoviesResult';
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

  constructor(
    private route: ActivatedRoute,
    private apiConfigService: ApiConfigService,
    private tmdbTrendingService: TmdbTrendingService
  ) { }

  public posterUrlPath = (posterPath: string) => {
    return this.apiConfigService.getTrendingItemImageUrl(posterPath);
  }

  ngOnInit() {
    // TODO - Use rxjs here to combine these results?
    this.tmdbTrendingService.getWeeklyTrend('movie').subscribe((trendingResults: TrendingMoviesResult) => {
      this.trendingMovies = trendingResults.results;
    });
    this.tmdbTrendingService.getWeeklyTrend('tv').subscribe((trendingResults: TrendingMoviesResult) => {
      this.trendingShows = trendingResults.results;
    });
  }

}
