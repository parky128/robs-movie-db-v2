import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})

export class TmdbPersonService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
  }

  public getPerson = (id: string) => {
    const url = [
      `${environment.apiUrl}/${environment.apiVersion}/person/${id}`,
      `?api_key=${environment.apiKey}&append_to_response=movie_credits,tv_credits&language=` + this.languageService.getLanguage()
    ].join('');
    return this.http.get(url);
  }
}
