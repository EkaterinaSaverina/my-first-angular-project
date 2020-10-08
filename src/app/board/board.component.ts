import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { Board, Column } from '../core/models';
import { BoardService, ColumnService } from '../core/services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId: string;
  board$: Observable<Board>;
  columns$: Observable<Column[]>;

  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private activatedRoute: ActivatedRoute
  ) { }

  addColumn(title: string): void {
    if (!title) { return; }
    this.columnService.addColumn(this.boardId, title);
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
