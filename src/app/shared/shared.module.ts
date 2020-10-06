import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationDialogComponent,
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
    ConfirmationDialogComponent,
  ]
})
export class SharedModule { }
