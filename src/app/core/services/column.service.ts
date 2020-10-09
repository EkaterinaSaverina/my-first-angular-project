import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Column } from '../models';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService extends DatabaseService {

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  getColumns(boardId: string): Observable<Column[]> {
    return this.list<Column>(`/columns/${boardId}`);
  }

  getColumn(boardId: string): Observable<Column> {
    return this.object<Column>(`/columns/${boardId}`);
  }

  async addColumn(columnId: string, title: string): Promise<void> {
    return this.push<Column>(`/columns/${columnId}`, { title });
  }

  async setColumn(boardId: string, columnId: string, title: string): Promise<void> {
    return this.set<Column>(`/columns/${boardId}/${columnId}/title`, title);
  }

  async deleteColumn(boardId: string, columnId: string): Promise<void> {
    await this.remove<Column>(`/columns/${boardId}/${columnId}`);
  }
}
