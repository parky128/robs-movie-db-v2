import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastMembersComponent } from './cast-members.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    CastMembersComponent
  ],
  exports: [CastMembersComponent]
})
export class CastMembersModule { }
