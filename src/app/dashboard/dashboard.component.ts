import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { Board } from '../core/models';
import { BoardService, DialogService } from '../core/services';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  boardId: string;
  boardNewTitle: string;
  isEditMode = true;
  trackById = trackById;
  board$: Observable<Board>;
  boards$: Observable<Board[]>;

  constructor(
    private boardService: BoardService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) { }

  async addBoard(): Promise<void> {
    if (!this.boardNewTitle) { return; }
    await this.boardService.addBoard(this.boardNewTitle);
    this.clear();
  }

  async setBoard(boardId: string, boardNewTitle: string): Promise<void> {
    if (!boardId && !boardNewTitle) { return; }
    await this.boardService.setBoard(boardId, boardNewTitle);
  }

  async handleBoardDelete(boardId: string): Promise<void> {
    if (!boardId) { return; }
    await this.boardService.deleteBoard(boardId);
  }

  clear(): void {
    this.boardNewTitle = '';
    this.ref.markForCheck();
  }

  openDialog(boardId: string): void {
    if (!boardId) { return; }
    this.dialogService.openDialog({
      onConfirm: () => this.handleBoardDelete(boardId)
    });
  }

  openBoard(boardId: string): void {
    if (!boardId) { return; }
    this.router.navigate([`/boards/${boardId}`]);
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
