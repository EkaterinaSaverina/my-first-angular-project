import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Board } from '../models';
import { DatabaseService } from './database.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends DatabaseService {

  constructor(
    database: AngularFireDatabase,
    private firestoreService: FirestoreService
  ) {
    super(database);
  }

  getBoards(): Observable<Board[]> {
    return this.firestoreService.getCollection('boards');
  }

  getBoard(boardId: string): Observable<Board> {
    return this.firestoreService.getDocumentById('boards', boardId);
  }

  async addBoard(title: string): Promise<string> {
    return this.firestoreService.addDocument('boards', { title });
  }

  async setBoard(boardId: string, title: string): Promise<void> {
    return this.firestoreService.update(`boards/${boardId}`, { title });
  }

  async deleteBoard(boardId: string): Promise<void> {
    return this.firestoreService.delete(`/boards/${boardId}`);
  }
}
