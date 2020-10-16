import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { DatabaseService } from './database.service';
import { Board, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DatabaseService {

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  getCurrentUserBoards(userId: string): Observable<Board[]> {
    return this.list('/boards', ref => ref.orderByChild(`members/${userId}`).equalTo(true));
  }

  async addUserToDatabase(userData: string): Promise<void> {
    await this.push<User>('/users', userData);
  }
}
