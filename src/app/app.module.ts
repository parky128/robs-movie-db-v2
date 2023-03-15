import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { ApiConfigService } from './services/api-config/api-config.service';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SearchModule } from './search/search.module';

export function appConfigProvider(apiConfigService: ApiConfigService) {
  return () => apiConfigService.getApiConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( AppRoutes, { useHash: true } ),
    MatToolbarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    HomeModule,
    SearchModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appConfigProvider, deps: [ApiConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
