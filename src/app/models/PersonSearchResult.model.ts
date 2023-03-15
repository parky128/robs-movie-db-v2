import { MovieSearchResult } from './MovieSearchResult.model';
import { TVSearchResult } from './TVSearchResult.model';

export class PersonSearchResult {
  profile_path?: string;
  adult?: boolean;
  id?: number;
  media_type?: string;
  known_for?: Array<MovieSearchResult | TVSearchResult>;
  name?: string;
  popularity?: number;
}
