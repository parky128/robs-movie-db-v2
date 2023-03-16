import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

import { MovieComponent } from './movie.component';
import { MovieRoutes } from './movie.routes';
import { RouterModule } from '@angular/router';
import { MovieRouteResolver } from './movie-routing.resolver';
import { CastMembersModule } from '../shared/cast-members/cast-members.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    RouterModule.forChild(MovieRoutes),
    TranslateModule,
    CastMembersModule
  ],
  declarations: [
    MovieComponent
  ],
  exports: [MovieComponent],
  providers: [MovieRouteResolver]
})
export class MovieModule { }
