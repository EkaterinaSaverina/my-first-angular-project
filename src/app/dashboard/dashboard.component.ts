import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  isEditMode = true;

  constructor(
    private boardService: BoardService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  async addBoard(boardTitle: string): Promise<void> {
    if (!boardTitle) { return; }
    await this.boardService.addBoard(boardTitle);
  }

  async setBoard(boardId: string, boardNewTitle: string): Promise<void> {
    if (!boardId && !boardNewTitle) { return; }
    await this.boardService.setBoard(boardId, boardNewTitle);
  }

  async handleBoardDelete(boardId: string): Promise<void> {
    await this.boardService.deleteBoard(boardId);
  }

  openDialog(boardId: string): void {
    this.dialogService.openDialog({
      onConfirm: () => this.handleBoardDelete(boardId)
    });
  }

  openBoard(boardId: string): void {
    if (!boardId) { return; }
    this.router.navigate([`/boards/${boardId}`]);
  }

  changeMode(isEditMode: boolean): void {
    console.log(isEditMode);
    this.isEditMode = isEditMode;
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
