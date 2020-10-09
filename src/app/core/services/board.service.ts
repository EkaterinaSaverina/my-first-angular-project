import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Board } from '../models';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends DatabaseService  {

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  getBoards(): Observable<Board[]> {
    return this.list<Board>('/boards');
  }

  getBoard(boardId: string): Observable<Board> {
    return this.object<Board>(`/boards/${boardId}`);
  }

  async addBoard(title: string): Promise<void> {
    return this.push<Board>('/boards', { title });
  }

  async setBoard(boardId: string, title: string): Promise<void> {
    return this.set<Board>(`/boards/${boardId}/title`, title);
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.remove<Board>(`/boards/${boardId}`);
  }
}
