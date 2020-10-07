import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { Board } from '../core/models';
import { BoardService, DialogService } from '../core/services';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boardId: string;
  board$: Observable<Board>;
  boards$: Observable<Board[]>;
  trackById = trackById;

  constructor(
    private boardService: BoardService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async addBoard(boardTitle: string): Promise<void> {
    if (!boardTitle) { return; }
    await this.boardService.addBoard(boardTitle);
  }

  async handleBoardDelete(boardId: string): Promise<void> {
    await this.boardService.deleteBoard(boardId);
  }

  openDialog(boardId: string): void {
    this.dialogService.openDialog({
      onConfirm: () => this.handleBoardDelete(boardId)
    });
  }

  ngOnInit(): void {
    this.boards$ = this.boardService.getBoards();

    const boardId$: Observable<string> = this.activatedRoute.params
      .pipe(
        map(params => params.boardId),
        distinctUntilChanged(),
        filter(boardId => !!boardId),
        tap(boardId => this.boardId = boardId)
      );

    this.board$ = boardId$
      .pipe(switchMap((boardId) => this.boardService.getBoard(boardId)));
  }
}
