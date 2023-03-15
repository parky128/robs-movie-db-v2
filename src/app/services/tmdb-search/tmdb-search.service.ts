import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})

export class TmdbSearchService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
  }

  public multiSearch = (searchTerm: string) => {
    const url = [
      `${environment.apiUrl}/${environment.apiVersion}/search/multi?api_key=${environment.apiKey}`,
      `&query=${searchTerm}&language=${this.languageService.getLanguage()}`
    ].join('');
    return this.http.get(url);
  }

  public personSearch = (searchTerm: string) => {
    const url = [
      `${environment.apiUrl}/${environment.apiVersion}/search/person?api_key=${environment.apiKey}`,
      `&query=${searchTerm}&language=${this.languageService.getLanguage()}`
    ].join('');
    return this.http.get(url);
  }
}
