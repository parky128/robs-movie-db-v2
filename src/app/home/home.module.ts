import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ])
  ],
  declarations: [
    HomeComponent
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
