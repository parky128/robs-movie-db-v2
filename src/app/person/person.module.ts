import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatExpansionModule
} from '@angular/material/expansion';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PersonRoutes } from './person.routes';
import { PersonComponent } from './person.component';
import { PersonRouteResolver } from './person-routing.resolver';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    RouterModule.forChild(PersonRoutes),
    TranslateModule
  ],
  declarations: [
    PersonComponent
  ],
  providers: [PersonRouteResolver],
  exports: [PersonComponent]
})
export class PersonModule { }
