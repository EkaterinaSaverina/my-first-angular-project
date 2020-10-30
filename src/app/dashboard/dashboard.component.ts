import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Board } from '../core/models';
import { BoardService, DialogService } from '../core/services';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boardNewTitle: string;
  isEditMode = true;
  trackById = trackById;
  boards$: Observable<Board[]>;

  constructor(
    private boardService: BoardService,
    private dialogService: DialogService,
    private router: Router
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

  async addMember(boardId: string, userId: string): Promise<void> {
    await this.boardService.updateUserMembers(boardId, userId);
  }

  clear(): string {
    return this.boardNewTitle = '';
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
    this.boards$ = this.boardService.getCurrentUserBoards();
  }
}
