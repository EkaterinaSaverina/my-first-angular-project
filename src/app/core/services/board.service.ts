import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';

import { Board, User } from '../models';
import { DatabaseService } from './database.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends DatabaseService {
  userEmail: string;

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
    return this.push<Board>('/boards', { title });
  }

  async setBoard(boardId: string, title: string): Promise<void> {
    return this.set<Board>(`/boards/${boardId}/title`, title);
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.remove<Board>(`/boards/${boardId}`);
  }

  getCurrentUserBoardsByEmail(): Observable<Board[]> {
    return this.userService.getCurrentUser(this.userEmail)
      .pipe(
        switchMap((user) => {
          return this.list<Board>('/boards', ref => ref.orderByChild(`members/${user._id}`).equalTo(true));
        })
      );
  }

  getCurrentUserBoardsById(user: User): Observable<Board[]> {
    return this.list<Board>('/boards', ref => ref.orderByChild(`members/${user._id}`).equalTo(true));
  }
}
