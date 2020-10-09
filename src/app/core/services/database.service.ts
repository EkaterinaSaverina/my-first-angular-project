import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private database: AngularFireDatabase) { }

  list<T>(path: string): Observable<T[]> {
    return this.database.list<T>(path).snapshotChanges()
      .pipe(map(actions => actions.map(action => ({
        ...action.payload.val(),
        _id: action.key
      }))));
  }

  object<T>(path: string): Observable<T> {
    return this.database.object<T>(path).snapshotChanges()
      .pipe(map(action => ({
        ...action.payload.val(),
        _id: action.key
      })));
  }

  async push<T>(path: string, data: any): Promise<void> {
    await this.database.list<T>(path).push(data);
  }

  async update<T>(path: string, data: any): Promise<void> {
    await this.database.object<T>(path).update(data);
  }

  async set<T>(path: string, data: any): Promise<void> {
    await this.database.object<T>(path).set(data);
  }

  async remove<T>(path: string): Promise<void> {
    await this.database.object<T>(path).remove();
  }
}
