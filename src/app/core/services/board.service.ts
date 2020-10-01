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
    const { boards } = await this.get<{ boards: Board[] }>('boards');
    this._boards$.next(boards);
  }

  async addBoard(title: string): Promise<void> {
    await this.post('boards', { title });
  }
}
