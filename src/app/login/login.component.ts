import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersService } from '../core/services';
import { UserNew } from '../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logIn = true;
  email: string;
  name: string;
  password: string;

  currentUser$: Observable<UserNew>;

  constructor(private usersService: UsersService) { }

  ngOnInit() { }

  makeActive(isLogin: boolean): void {
    this.logIn = isLogin;
  }

  async login(event: Event): Promise<void> {
    const response = await this.usersService.login(this.email, this.password);
  }

  async register(event: Event): Promise<void> {
    const response = await this.usersService.register(this.email, this.name, this.password);
  }

}
