import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './dialogs/confirmation-dialog/dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    MaterialModule,
    HeaderComponent,
    DialogComponent,
  ]
})
export class SharedModule { }
