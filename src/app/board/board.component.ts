import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { Board, Column } from '../core/models';
import { BoardService, ColumnService, DialogService } from '../core/services';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId: string;
  columnNewTitle: string;
  board$: Observable<Board>;
  columns$: Observable<Column[]>;
  trackById = trackById;

  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
  ) { }

  async addColumn(): Promise<void> {
    if (!this.columnNewTitle) { return; }
    await this.columnService.addColumn(this.boardId, this.columnNewTitle);
    this.clear();
  }

  async setColumn(columnId: string, columnNewTitle: string): Promise<void> {
    if (!columnId && !columnNewTitle) { return; }
    await this.columnService.setColumn(this.boardId, columnId, columnNewTitle);
  }

  async handleColumnDelete(сolumnId: string): Promise<void> {
    await this.columnService.deleteColumn(this.boardId, сolumnId);
  }

  async addMember(userId: string): Promise<void> {
    await this.boardService.updateUserMembers(this.boardId, userId);
  }

  clear(): string {
    return this.columnNewTitle = '';
  }

  openDialog(сolumnId: string): void {
    this.dialogService.openDialog({
      onConfirm: () => this.handleColumnDelete(сolumnId)
    });
  }

  ngOnInit(): void {
    const boardId$: Observable<string> = this.activatedRoute.params
      .pipe(
        map(params => params.boardId),
        distinctUntilChanged(),
        filter(boardId => !!boardId),
        tap(boardId => this.boardId = boardId)
      );

    this.board$ = boardId$
      .pipe(switchMap(boardId => this.boardService.getBoard(boardId)));

    this.columns$ = boardId$
      .pipe(switchMap(boardId => this.columnService.getColumns(boardId)));
  }
}
