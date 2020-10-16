import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogService } from '../../core/services';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent {
  @Input() id: string;

  @Output() onAdd = new EventEmitter<void>();

  constructor(private dialogService: DialogService) { }

  addMember(boardId: string): void {
    if (!boardId) { return; }
    this.dialogService.openDialog();
  }
}
