import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
//import { MatNativeDateModule } from '@angular/material/da';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvancedSearchComponent } from './advanced-search.component';
import { AdvancedSearchRoutes } from './advanced-search-routing.module';
import { SearchResultMovieModule } from '../shared/search-result-movie/search-result-movie.module';
import { RouterModule } from '@angular/router';
import { AdvancedSearchRouteResolver } from './advanced-search-routing.resolver';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    //MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdvancedSearchRoutes),
    TranslateModule,
    SearchResultMovieModule
  ],
  declarations: [
    AdvancedSearchComponent
  ],
  providers: [AdvancedSearchRouteResolver],
  exports: [AdvancedSearchComponent]
})
export class AdvancedSearchModule { }
