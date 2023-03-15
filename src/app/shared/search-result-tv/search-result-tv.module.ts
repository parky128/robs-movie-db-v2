import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultTVComponent } from './search-result-tv.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchResultTVComponent
  ],
  exports: [SearchResultTVComponent]
})
export class SearchResultTVModule { }
