import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})

export class TmdbTvService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
  }

  public getTv = (id: string) => {
    const url = [
      `${environment.apiUrl}/${environment.apiVersion}/tv/${id}?`,
      `api_key=${environment.apiKey}&append_to_response=credits&language=` + this.languageService.getLanguage()
    ].join('');
    return this.http.get(url);
  }
}
