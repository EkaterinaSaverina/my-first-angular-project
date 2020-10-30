import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Dialog, Members } from '../../core/models';
import { DialogService, UserService } from '../../core/services';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnChanges {
  @Input() members: Members;

  @Output() onMemberAdd = new EventEmitter<string>();

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
  ) { }

  async updateUserMembers(email: string): Promise<void> {
    if (!email) { return; }
    const userId = await this.userService.getUserIdByEmail(email);
    if (!!userId) {
      this.onMemberAdd.emit(userId);
    }
  }

  openMemberDialog(): void {
    this.dialogService.openDialog({
      type: Dialog.MemberDialogComponent,
      content: 'Please enter an email',
      confirmText: 'Add',
      onConfirm: (enteredEmail) => this.updateUserMembers(enteredEmail),
    });
  }

  ngOnChanges(): void { }
}
