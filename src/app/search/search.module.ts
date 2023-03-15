import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchResultPersonComponent } from '../shared/search-result-person/search-result-person.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchResultMovieModule } from '../shared/search-result-movie/search-result-movie.module';
import { SearchResultTVModule } from '../shared/search-result-tv/search-result-tv.module';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SearchResultMovieModule,
    SearchResultTVModule
  ],
  declarations: [
    SearchComponent,
    SearchResultPersonComponent
  ],
  exports: [SearchComponent],
  providers: [DatePipe]
})
export class SearchModule { }
