import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

import { TvComponent } from './tv.component';
import { TvRoutes } from './tv.routes';
import { RouterModule } from '@angular/router';
import { TvRouteResolver } from './tv-routing.resolver';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    RouterModule.forChild(TvRoutes),
    TranslateModule
  ],
  declarations: [
    TvComponent
  ],
  providers: [TvRouteResolver],
  exports: [TvComponent]
})
export class TvModule { }
