import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { MembersListComponent } from './members-list/members-list.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { MemberDialogComponent } from './dialogs/member-dialog/member-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MembersListComponent,
    ConfirmationDialogComponent,
    MemberDialogComponent,
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
    MembersListComponent,
    ConfirmationDialogComponent,
    MemberDialogComponent,
  ]
})
export class SharedModule { }
