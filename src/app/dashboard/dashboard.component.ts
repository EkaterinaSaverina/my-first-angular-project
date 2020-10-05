import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Board, Dialog } from '../core/models';
import { BoardService, DialogService, NotificationsService } from '../core/services';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[]>;
  trackById = trackById;
  errorToShow: string;

  constructor(
    private boardService: BoardService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
  ) {
    this.getBoards();
  }

  async addBoard(boardTitle: string): Promise<void> {
    await this.boardService.addBoard(boardTitle);
    this.getBoards();
  }

  async deleteBoard(boardId: string): Promise<void> {
    try {
      await this.boardService.deleteBoard(boardId);
      this.getBoards();
    }
    catch (error) {
      this.errorToShow = error.message;
      this.notificationsService.openSnackBar(this.errorToShow, 'close');
    }
  }

  openDialog(boardId: string): void {
    this.dialogService.openDialog({
      onConfirm: () => this.handleBoardDelete(boardId)
    });
  }

  ngOnInit(): void {
    this.boards$ = this.boardService.boards$;
  }

  private handleBoardDelete(boardId: string): void {
    this.boardService.deleteBoard(boardId);
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }
}
