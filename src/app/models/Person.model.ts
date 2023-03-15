import { MovieCredits } from './MovieCredits.model';
import { TVCredits } from './TVCredits.model';

export class Person {
  birthday?: string;
  known_for_department?: boolean;
  deathday?: string;
  id?: number;
  name?: string;
  also_known_as?: Array<string>;
  gender?: number;
  biography?: string;
  popularity?: number;
  place_of_birth?: number;
  profile_path?: string;
  adult?: boolean;
  imdb_id?: string;
  homepage?: string;
  movie_credits?: MovieCredits;
  tv_credits?: TVCredits;
}
