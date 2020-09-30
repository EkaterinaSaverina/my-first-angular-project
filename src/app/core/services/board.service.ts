import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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
    // const { boards } = await this.get<{ boards: Board[] }>('boards');
    const boards = [
      { title: 'Board 1' } as Board,
      { title: 'Board 2' } as Board,
      { title: 'Board 3' } as Board,
      { title: 'Board 4' } as Board,
      { title: 'Board 5' } as Board,
    ];
    this._boards$.next(boards);
  }

  async addBoard(title: string): Promise<void> {
    // await this.post('board', { title });
    this._boards$.next([...this.boards, { title: 'qweqwe' } as Board]);
  }
}
