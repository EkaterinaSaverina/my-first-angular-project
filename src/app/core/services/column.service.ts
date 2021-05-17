import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Column } from '../models';
import { DatabaseService } from './database.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService extends DatabaseService {

  constructor(
    database: AngularFireDatabase,
    private firestoreService: FirestoreService
  ) {
    super(database);
  }

  getColumns(boardId: string): Observable<Column[]> {
    return this.firestoreService.getCollection(`/boards/${boardId}/columns`);
  }

  getColumn(boardId: string): Observable<Column> {
    return this.object<Column>(`/columns/${boardId}`);
    // return this.firestoreService.getDocumentById('columns', boardId);
  }

  getColumnById(boardId: string, columnId: string): Observable<Column> {
    return this.object<Column>(`/columns/${boardId}/${columnId}`);
    // return this.firestoreService.getDocumentById(`/${boardId}/columns/${columnId}`);
  }

  async addColumn(columnId: string, title: string): Promise<string> {
    return this.firestoreService.addDocument(`/boards/${columnId}/columns`, { title });
  }

  async setColumn(boardId: string, columnId: string, title: string): Promise<void> {
    return this.firestoreService.update(`/boards/${boardId}/columns/${columnId}`, { title });
  }

  async deleteColumn(boardId: string, columnId: string): Promise<void> {
    return this.firestoreService.delete(`/boards/${boardId}/columns/${columnId}`);
  }
}
