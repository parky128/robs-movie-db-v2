import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfigModel } from '../../models/apiConfig.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiConfigService {

  public apiConfig: APIConfigModel;

  constructor(private http: HttpClient) {
  }

  public getApiConfig = () => {
    return this.http.get<APIConfigModel>(`https://api.themoviedb.org/3/configuration?api_key=${environment.apiKey}`)
      .subscribe((apiConfigResponse: APIConfigModel) => {
        this.apiConfig = apiConfigResponse;
      });
  }

  public getSearchResultImageUrl = (imagePath: string) => {
    return `${this.apiConfig.images.base_url}w92/${imagePath}`;
  }

  public getMoviePosterUrl = (imagePath: string) => {
    return `${this.apiConfig.images.base_url}w185/${imagePath}`;
  }

  public getPersonProfileUrl = (imagePath: string) => {
    return `${this.apiConfig.images.base_url}w185/${imagePath}`;
  }

  public getCastProfileUrl = (imagePath: string) => {
    return `${this.apiConfig.images.base_url}w45/${imagePath}`;
  }

  public getTrendingItemImageUrl = (imagePath: string) => {
    return `${this.apiConfig.images.base_url}w45/${imagePath}`;
  }
}
