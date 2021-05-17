import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TaskComponent } from 'src/app/task/task.component';
import { ColumnComponent } from './column.component';

@NgModule({
  declarations: [
    ColumnComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ColumnModule { }
