import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie.model';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { MovieCast } from '../models/MovieCast.model';
import { TmdbMovieService } from '../services/tmdb-movie/tmdb-movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie;
  moviePosterUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiConfigService: ApiConfigService,
    private tmdbMovieService: TmdbMovieService
  ) {
  }

  public getCastMemberImageUrl = (profilePath: string) => {
    return this.apiConfigService.getCastProfileUrl(profilePath);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ movie }) => {
      this.movie = movie;
      if(this.movie.poster_path) {
        this.moviePosterUrl = this.apiConfigService.getMoviePosterUrl(this.movie.poster_path);
      }
    });
  }
}
