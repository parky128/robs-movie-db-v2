import { Component, OnInit, OnDestroy } from '@angular/core';
//import {TranslateService} from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';
import { SpinnerService } from './services/spinner/spinner.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  showSpinner = false;
  showSearch = true;
  showHomeNavLink = true;

  private spinnerSubscription: Subscription | undefined;
  private languageSubscription: Subscription | undefined;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    this.translate.setDefaultLang(this.languageService.getLanguage());
  }

  public goToAdvancedSearch = () => {
    this.router.navigateByUrl('/advanced-search');
  }

  ngOnInit() {

    this.spinnerSubscription = this.spinnerService.showSpinner.subscribe((show) => {
      this.showSpinner = show;
    });

    this.languageSubscription = this.languageService.selectedLanguage.subscribe(() => {
      window.location.reload();
    });

    // this.router.events.pipe(
    //   filter((event: Event) => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) =>  {
    //   this.showSearch = event.url !== '/advanced-search';
    //   this.showHomeNavLink = event.url !== '/home';
    // });
  }

  ngOnDestroy() {
    if (this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
