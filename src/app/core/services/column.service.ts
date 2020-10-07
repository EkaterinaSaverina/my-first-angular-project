import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Column } from '../models';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService extends DatabaseService  {

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  getColumns(): Observable<Column[]> {
    return this.list<Column>('/columns');
  }

  getColumn(columnId: string): Observable<Column> {
    return this.object<Column>(`/columns/${columnId}`);
  }

  async addColumn(title: string): Promise<void> {
    return this.push<Column>('/columns', { title });
  }

  async updateColumn(columnId: string, title: string): Promise<void> {
    return this.update<Column>(`/columns/${columnId}/title`, title);
  }

  async deleteColumn(columnId: string): Promise<void> {
    await this.remove<Column>(`/columns/${columnId}`);
  }
}
