import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { Column } from '../../core/models';
import { BoardService, ColumnService } from '../../core/services';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  columnId: string;
  column$: Observable<Column>;
  cards$: Observable<Card[]>;

  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private activatedRoute: ActivatedRoute
  ) { }

  addCard(title: string): void {
    if (!title) { return; }
    this.cardService.addCard(this.columnId, title);
  }

  ngOnInit(): void {
    const columnId$: Observable<string> = this.activatedRoute.params
      .pipe(
        map(params => params.columnId),
        distinctUntilChanged(),
        filter(columnId => !!columnId),
        tap(columnId => this.columnId = columnId)
      );

    this.column$ = columnId$
      .pipe(switchMap((columnId) => this.boardService.getBoard(columnId)));
    this.cards$ = columnId$
      .pipe(switchMap((columnId) => this.columnService.getColumns()));
  }
}
