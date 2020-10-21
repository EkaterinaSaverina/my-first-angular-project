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
  userEmail: string;

  constructor(database: AngularFireDatabase) {
    super(database);
  }

  async addUserToDatabase(userData: User): Promise<void> {
    this.userEmail = userData.email;
    await this.push<User>('/users', userData);
  }

  getCurrentUser(): Observable<User> {
    return this.list<User>('/users', ref => ref.orderByChild('email').equalTo(`${this.userEmail}`))
      .pipe(
        map(users => {
          return users[0];
        }
        ));
  }
}
