import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Board } from '../core/models';
import { BoardService, NotificationsService } from '../core/services';
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
  boardId: Board;

  constructor(
    private boardService: BoardService,
    private notificationsService: NotificationsService,
  ) {
    this.getBoards();
  }

  async addBoard(boardTitle: string): Promise<void> {
    await this.boardService.addBoard(boardTitle);
    this.getBoards();
  }

  async deleteBoard(): Promise<void> {
    try {
      await this.boardService.deleteBoard(this.boardId._id);
      this.getBoards();
    }
    catch (error) {
      this.errorToShow = error.message;
      this.notificationsService.openSnackBar(this.errorToShow, 'close');
    }
  }

  ngOnInit(): void {
    this.boards$ = this.boardService.boards$;
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }
}
