import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ColumnComponent } from './column.component';

@NgModule({
  declarations: [ColumnComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ColumnModule { }
