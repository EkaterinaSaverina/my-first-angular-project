import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { Board } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends ApiService {
  private _boards$ = new BehaviorSubject<Board[]>([]);

  public readonly boards$ = this._boards$.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  get boards(): Board[] {
    return this._boards$.getValue();
  }

  async sendBoardsRequest(): Promise<void> {
    const { boards } = await this.get<{ boards: Board[] }>('boards');
    this._boards$.next(boards);
  }

  async addBoard(title: string): Promise<void> {
    this._boards$.next([...this.boards, { title } as Board]);
    await this.post('boards', { title });
  }

  async deleteBoard(boardId: string): Promise<Board> {
    console.log(this.boards);
    return await this.delete(`boards/${boardId}`, { _id: boardId });
  }
}
