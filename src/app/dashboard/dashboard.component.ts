import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Board } from '../core/models';
import { BoardService } from '../core/services';
import { trackById } from '../core/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[]>;

  trackById = trackById;

  constructor(
    private boardService: BoardService
  ) {
    this.getBoards();
  }

  async addBoard(): Promise<void> {
    await this.boardService.addBoard('title');
    // this.getBoards();
  }

  ngOnInit(): void {
    this.boards$ = this.boardService.boards$;
  }

  private getBoards(): void {
    this.boardService.sendBoardsRequest();
  }

}
