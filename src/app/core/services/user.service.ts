import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatabaseService } from './database.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DatabaseService {

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  getCurrentUser(email: string): Observable<User> {
    return this.list<User>('/users', ref => ref.orderByChild('email').equalTo(`${email}`))
      .pipe(
        map((users) => {
          return users[0];
        }
        ));
  }

  async addUserToDatabase(userData: string): Promise<void> {
    await this.push<User>('/users', userData);
  }
}
