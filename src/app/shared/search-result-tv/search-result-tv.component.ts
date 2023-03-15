import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { TVSearchResult } from '../../models/TVSearchResult.model';

@Component({
  selector: 'app-search-result-tv',
  templateUrl: './search-result-tv.component.html',
  styleUrls: ['./search-result-tv.component.scss']
})

export class SearchResultTVComponent implements OnInit {

  @Input() tvSearchResult: TVSearchResult;
  posterUrlPath: string;

  constructor(
    private apiConfigService: ApiConfigService
  ) {
  }

  ngOnInit() {
    if(this.tvSearchResult.poster_path) {
      this.posterUrlPath = this.apiConfigService.getSearchResultImageUrl(this.tvSearchResult.poster_path);
    }
    
  }
}
