import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { ColumnComponent } from './column/column.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardRoutingModule,
  ]
})
export class BoardModule { }
