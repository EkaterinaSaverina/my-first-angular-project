import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { dialogsMap } from 'src/app/shared/dialogs';
import { Dialog, DialogOptions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private defaultDialogOptions: DialogOptions = {
    type: Dialog.ConfirmationDialogComponent,
    content: 'Are you sure?',
    confirmText: 'Ok',
    cancelText: 'Cancel'
  };
  private defaultDialogConfig: MatDialogConfig = {
    height: '300px',
    width: '300px',
    panelClass: 'custom-dialog'
  };

  constructor(public dialog: MatDialog) { }

  openDialog(dialogOptions?: DialogOptions, dialogConfig?: MatDialogConfig): void {
    const data = {
      ...this.defaultDialogOptions,
      ...dialogOptions
    };
    const config = {
      ...this.defaultDialogConfig,
      ...(dialogConfig || {}),
      data
    };
    const dialogComponent = dialogsMap[data.type];
    const boardId = this.dialog.open(dialogComponent, config);
  }

}
