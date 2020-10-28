import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DatabaseService } from './database.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DatabaseService {

  constructor(
    database: AngularFireDatabase,
    private router: Router,
  ) {
    super(database);
  }

  async addUserToDatabase(userData: User): Promise<void> {
    const users = await this.list<User>('/users', ref => ref.orderByChild('email').equalTo(userData.email))
      .pipe(take(1)).toPromise();
    if (users.length === 0) {
      const userId = await this.push<User>('/users', {
        email: userData.email,
        name: userData.name || null,
      });
      localStorage.setItem('userId', userId);
    } else {
      const userId = users[0]._id;
      localStorage.setItem('userId', userId);
    }
  }

  getUserId(): string {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['login']);
    }
    return userId;
  }

  getUsersEmails(): Observable<string[]> {
    return this.list<User>('/users')
      .pipe(
        map(users => {
          return users.map(user => user.email);
        }
        ));
  }
}
