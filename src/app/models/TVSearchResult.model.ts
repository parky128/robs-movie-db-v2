import { TVCredits } from './TVCredits.model';

export class TVSearchResult {
  poster_path?: string;
  popularity?: number;
  id?: number;
  overview?: string;
  backdrop_path?: string;
  vote_average?: number;
  media_type?: string;
  first_air_date?: string;
  origin_country?: Array<string>;
  genre_ids?: Array<number>;
  original_language?: string;
  vote_count?: number;
  name?: string;
  original_name?: string;
  credits?: TVCredits;
}
