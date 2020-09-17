import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { LoginModule } from './login/login.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Promise<any> {
    return this.http.post(`${APIUrl}/auth/singin`, {
      email,
      password
    }).toPromise();
  }

  public getUsers(): Array<any> {
    return [
      { firstName: 'Ivan', lastName: 'Sidorov' },
      { firstName: 'Vasya', lastName: 'Vasilev' },
      { firstName: 'Ilya', lastName: 'Mogilev' }
    ];
  }
}
