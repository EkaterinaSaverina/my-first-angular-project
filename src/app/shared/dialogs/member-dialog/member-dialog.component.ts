import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogOptions } from '../../../core/models';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOptions) { }

  confirm(): void {
    this.data?.onConfirm();
  }
}
