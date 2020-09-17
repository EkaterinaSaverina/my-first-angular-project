import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { APIUrl } from '../constants';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _user$ = new BehaviorSubject<User>(null);

  public readonly user$ = this._user$.asObservable();

  constructor(private http: HttpClient) { }

  get user(): User {
    return this._user$.getValue();
  }

  login(email: string, password: string): Promise<User> {
    const path = `${APIUrl}/auth/singin`;
    const body = { email, password };
    return this.http.post<User>(path, body)
      .pipe(map((result) => {
        this._user$.next(result);
        return result;
      }))
      .toPromise();
  }

  public async getUsers(): Promise<User[]> {
    return [
      { firstName: 'Ivan', lastName: 'Sidorov' },
      { firstName: 'Vasya', lastName: 'Vasilev' },
      { firstName: 'Ilya', lastName: 'Mogilev' }
    ];
  }
}
