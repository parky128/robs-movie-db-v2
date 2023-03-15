import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { PersonSearchResult } from '../../models/PersonSearchResult.model';
import { MovieSearchResult } from '../../models/MovieSearchResult.model';
import { TVSearchResult } from '../../models/TVSearchResult.model';

@Component({
  selector: 'app-search-result-person',
  templateUrl: './search-result-person.component.html',
  styleUrls: ['./search-result-person.component.scss']
})

export class SearchResultPersonComponent implements OnInit {

  @Input() personSearchResult: PersonSearchResult;
  profileUrlPath: string;
  knownFor: string;

  constructor(
    private apiConfigService: ApiConfigService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    if(this.personSearchResult.profile_path) {
      this.profileUrlPath = this.apiConfigService.getSearchResultImageUrl(this.personSearchResult.profile_path);
    }
    
    if (this.personSearchResult.known_for) {
      this.knownFor = this.personSearchResult.known_for.map((item) => {
        let result;
        if (item.media_type === 'movie') {
          result  = (<MovieSearchResult>item);
          return `${result.title} (${this.datePipe.transform(result.release_date, 'yyyy')})`;
        }
        result = (<TVSearchResult>item);
        return `${result.name} (${this.datePipe.transform(result.first_air_date, 'yyyy')})`;
      }).join(', ');
    }
  }
}
