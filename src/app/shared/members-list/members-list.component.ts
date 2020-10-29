import { Component, Input, OnChanges } from '@angular/core';

import { Dialog, Members } from '../../core/models';
import { BoardService, DialogService } from '../../core/services';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnChanges {
  @Input() id: string;
  @Input() members: Members;

  constructor(
    private dialogService: DialogService,
    private boardService: BoardService,
  ) { }

  async addUserAsMember(email: string): Promise<void> {
    if (!email) { return; }
    console.log(email);
    await this.boardService.addUserAsMember(email);
  }

  openMemberDialog(): void {
    this.dialogService.openDialog({
      type: Dialog.MemberDialogComponent,
      content: 'Please enter an email',
      confirmText: 'Add',
      onConfirm: (enteredEmail) => this.addUserAsMember(enteredEmail)
    });
  }

  ngOnChanges(): void { }
}
