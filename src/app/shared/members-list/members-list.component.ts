import { Component, Input, OnChanges } from '@angular/core';

import { Members } from '../../core/models';
import { DialogService } from '../../core/services';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnChanges {
  @Input() members: Members;

  constructor(
    private dialogService: DialogService,
  ) { }

  openMemberDialog(): void {
    this.dialogService.openDialog();
  }

  ngOnChanges(): void { }
}
