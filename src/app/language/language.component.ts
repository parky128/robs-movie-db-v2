import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  public availableLanguages: Array<string> = [];
  selectedLanguage = 'en';

  constructor(
    private languageService: LanguageService
  ) { }

  public changeLanguage = (language: string) => {
    this.languageService.setLanguage(language);
  }

  ngOnInit() {
    this.availableLanguages.push('en', 'de');
    this.selectedLanguage = this.languageService.getLanguage();
  }

}
