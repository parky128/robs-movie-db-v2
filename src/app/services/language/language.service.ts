import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  public selectedLanguage: Subject<string> = new Subject<string>();

  constructor(
    private translate: TranslateService
  ) {
    this.selectedLanguage.next(this.getLanguage());
  }

  public setLanguage = (language: string) => {
    window.localStorage.setItem('language', language);
    this.translate.setDefaultLang(language);
    this.selectedLanguage.next(language);
  }

  public getLanguage = () => {
    const storedLanguagePref = window.localStorage.getItem('language');
    if (storedLanguagePref) {
      return storedLanguagePref;
    }

    return 'en';
  }
}
