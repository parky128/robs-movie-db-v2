import { MovieSearchResult } from './MovieSearchResult.model';
import { TmdbPagedResult } from './TmdbPagedResult.model';

export class TrendingMoviesResult extends TmdbPagedResult {
  results: Array<MovieSearchResult>;
}
