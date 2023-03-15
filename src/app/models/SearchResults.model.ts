import { MovieSearchResult } from './MovieSearchResult.model';
import { PersonSearchResult } from './PersonSearchResult.model';
import { TVSearchResult } from './TVSearchResult.model';

export class SearchResults {
  page: number;
  results: Array<MovieSearchResult | PersonSearchResult | TVSearchResult>;
  total_results: number;
  total_pages: number;
}
