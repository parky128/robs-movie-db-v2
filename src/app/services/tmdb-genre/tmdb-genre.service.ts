import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})

export class TmdbGenreService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
  }

  public getGenres = () => {
    const url = [
      `${environment.apiUrl}/${environment.apiVersion}/genre/movie/list?api_key=`,
      `${environment.apiKey}&language=${this.languageService.getLanguage()}`
    ].join('');
    return this.http.get(url);
  }
}
