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
  board$: Observable<Board>;
  columns$: Observable<Column[]>;
  trackById = trackById;

  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
  ) { }

  async addColumn(title: string): Promise<void> {
    if (!title) { return; }
    await this.columnService.addColumn(this.boardId, title);
  }

  async setColumn(columnId: string, columnNewTitle: string): Promise<void> {
    if (!columnId && !columnNewTitle) { return; }
    await this.columnService.setColumn(this.boardId, columnId, columnNewTitle);
  }

  async handleColumnDelete(сolumnId: string): Promise<void> {
    await this.columnService.deleteColumn(this.boardId, сolumnId);
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
      .pipe(switchMap((boardId) => this.boardService.getBoard(boardId)));
    this.columns$ = boardId$
      .pipe(switchMap((boardId) => this.columnService.getColumns(boardId)));
  }
}
