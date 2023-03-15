import { Component, OnInit, Input } from '@angular/core';
import { MovieSearchResult } from '../../models/MovieSearchResult.model';
import { ApiConfigService } from '../../services/api-config/api-config.service';

@Component({
  selector: 'app-search-result-movie',
  templateUrl: './search-result-movie.component.html',
  styleUrls: ['./search-result-movie.component.scss']
})

export class SearchResultMovieComponent implements OnInit {
  @Input() movieSearchResult: MovieSearchResult;
  posterUrlPath: string;

  constructor(
    private apiConfigService: ApiConfigService
  ) {
  }

  ngOnInit() {
    //TODO - consider preparn
    if(this.movieSearchResult.poster_path) {
      this.posterUrlPath = this.apiConfigService.getSearchResultImageUrl(this.movieSearchResult.poster_path);
    }
    
  }
}
