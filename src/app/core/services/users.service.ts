import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { UserNew } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {
  private user: UserNew;
  private isAuthorizedSubject = new BehaviorSubject<boolean>(undefined);

  constructor(http: HttpClient) {
    super(http);
    
    const isAuthorized = !!localStorage.getItem('token');
    this.isAuthorizedSubject.next(isAuthorized);
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  getUser(): UserNew {
    return this.user;
  }

  async login(email: string, password: string): Promise<UserNew> {
    const body = { email, password };
    const { user } = await this.postWithoutToken('auth/signin', body);
    this.isAuthorizedSubject.next(true);
    return this.user = user;
  }

  async register(email: string, name: string, password: string): Promise<UserNew> {
    const body = { email, name, password };
    const { user } = await this.postWithoutToken('auth/signup', body);
    return this.user = user;
  }
}
