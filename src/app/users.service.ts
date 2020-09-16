import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public getUsers(): Array<any> {
    return [
      { firstName: 'Ivan', lastName: 'Sidorov' },
      { firstName: 'Vasya', lastName: 'Vasilev' },
      { firstName: 'Ilya', lastName: 'Mogilev' }
    ];
  }
}
