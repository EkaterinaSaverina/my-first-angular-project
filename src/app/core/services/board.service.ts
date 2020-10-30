import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Board, Members } from '../models';
import { DatabaseService } from './database.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends DatabaseService {

  constructor(
    database: AngularFireDatabase,
    private userService: UserService,
  ) {
    super(database);
  }

  getBoards(): Observable<Board[]> {
    return this.list<Board>('/boards');
  }

  getBoard(boardId: string): Observable<Board> {
    return this.object<Board>(`/boards/${boardId}`);
  }

  async addBoard(title: string): Promise<void> {
    const boardId = await this.push<Board>('/boards', { title });
    const userId = this.userService.getUserId();
    await this.updateUserMembers(boardId, userId);
  }

  async setBoard(boardId: string, title: string): Promise<void> {
    await this.set<Board>(`/boards/${boardId}/title`, title);
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.remove<Board>(`/boards/${boardId}`);
  }

  async updateUserMembers(boardId: string, userId: string): Promise<void> {
    await this.update<Members>(`/boards/${boardId}/members`, { [userId]: true });
  }

  getCurrentUserBoards(): Observable<Board[]> {
    const userId = this.userService.getUserId();
    return this.list<Board>('/boards', ref => ref.orderByChild(`members/${userId}`).equalTo(true));
  }

  getCurrentUserBoardsById(userId: string): Observable<Board[]> {
    return this.list<Board>('/boards', ref => ref.orderByChild(`members/${userId}`).equalTo(true));
  }
}
