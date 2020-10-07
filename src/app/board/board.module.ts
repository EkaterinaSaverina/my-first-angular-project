import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    SharedModule,
    BoardRoutingModule,
  ]
})
export class BoardModule { }
