import { TVSeason } from './TVSeason.model';
import { ProductionCompany } from './ProductionCompany.model';
import { TVLastEpisode } from './TVLastEpisode.model';
import { TVNetwork } from './TVNetwork.model';
import { Genre } from './Genre.model';
import { TVCreator } from './TVCreator.model';
import { TVCredits } from './TVCredits.model';

export class TVShow {
  backdrop_path?: string;
  created_by?: Array<TVCreator>;
  episode_run_time?: Array<number>;
  first_air_date?: number;
  genres?: Array<Genre>;
  homepage?: string;
  id?: number;
  in_production?: string;
  languages?: Array<string>;
  last_air_date?: string;
  last_episode_to_air?: TVLastEpisode;
  name?: string;
  next_episode_to_air?: any;
  networks?: Array<TVNetwork>;
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_country?: Array<string>;
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Array<ProductionCompany>;
  seasons?: Array<TVSeason>;
  status?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
  credits?: TVCredits;
}
