import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  MatSelectModule,
} from '@angular/material/select';
import {
  MatInputModule
} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LanguageComponent } from './language.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LanguageComponent
  ],
  exports: [LanguageComponent]
})
export class LanguageModule { }
