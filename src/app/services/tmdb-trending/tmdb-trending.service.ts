import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../language/language.service';
import { Observable } from 'rxjs';
import { TrendingMoviesResult } from 'src/app/models/TrendingMoviesResult';

@Injectable({
  providedIn: 'root'
})

export class TmdbTrendingService {

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
  }

  public getWeeklyTrend = (mediaType: string) => {
    const url = [
      `${environment.apiUrl}/${environment.apiVersion}/trending/${mediaType}/week`,
      `?api_key=${environment.apiKey}&language=` + this.languageService.getLanguage()
    ].join('');
    return this.http.get<TrendingMoviesResult>(url);
  }
}
