import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { APIUrl } from '../constants';
import { UserRegistered } from '../model';
import { UserNew } from "../model"

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _user$ = new BehaviorSubject<UserRegistered>(null);

  public readonly user$ = this._user$.asObservable();

  constructor(private http: HttpClient) { }

  get user(): UserRegistered {
    return this._user$.getValue();
  }

  login(email: string, password: string): Promise<UserRegistered> {
    const path = `${APIUrl}/login`;
    const body = { email, password };
    return this.http.post<UserRegistered>(path, body)
      .pipe(map((result) => {
        this._user$.next(result);
        return result;
      }))
      .toPromise();
  }

  register(email: string, name: string, password: string): Promise<UserNew> {
    const path = `${APIUrl}/register`;
    const body = { email, name, password };
    return this.http.post<UserNew>(path, body)
      .pipe(map((result) => {
        this._user$.next(result);
        return result;
      }))
      .toPromise();
  }

  public async getUsers(): Promise<UserRegistered[]> {
    return [
      { email: 'Ivan', password: 'Sidorov' },
      { email: 'Vasya', password: 'Vasilev' },
      { email: 'Ilya', password: 'Mogilev' }
    ];
  }
}
