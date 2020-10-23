import { Component, OnInit } from '@angular/core';

import { DialogService } from '../../core/services';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  boardId: string;

  constructor(
    private dialogService: DialogService,
  ) { }

  openMemberDialog(boardId: string): void {
    if (!boardId) { return; }
    this.dialogService.openDialog({
      onConfirm: () => alert(boardId)
    });
  }

  ngOnInit(): void { }

}
