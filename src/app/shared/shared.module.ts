import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule
  ], 
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }
