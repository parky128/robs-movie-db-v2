import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultMovieComponent } from './search-result-movie.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchResultMovieComponent
  ],
  exports: [SearchResultMovieComponent]
})
export class SearchResultMovieModule { }
