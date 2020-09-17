import { Component, OnInit } from '@angular/core';

import { UsersService } from '../core/services/users.service';
import { UserRegistered } from '../core/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logIn = true;
  users: UserRegistered[];
  email: string;
  name: string;
  password: string;

  currentUser$: Observable<UserRegistered>;

  constructor(private usersService: UsersService) {
    // this.users = usersService.getUsers();

    this.currentUser$ = usersService.user$;
  }

  ngOnInit() { }

  changeActivity(isLogin: boolean): void {
    this.logIn = isLogin;
  }

  async login(event: Event): Promise<void> {
    const response = await this.usersService.login(this.email, this.password);
  }

  async register(event: Event): Promise<void> {
    const response = await this.usersService.register(this.email, this.name, this.password);
  }

}
