import { Component, Input, OnInit } from '@angular/core';

import { UsersService } from '../core/services/users.service';
import { User } from '../core/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() title: string;

  logIn = true;
  users: User[];
  email: string;
  password: string;

  currentUser$: Observable<User>;

  constructor(private usersService: UsersService) {
    this.users = usersService.getUsers();

    this.currentUser$ = usersService.user$;
  }

  ngOnInit() {}

  changeActivity(isLogin: boolean): void {
    this.logIn = isLogin;
  }

  async login(event: Event): Promise<void> {
    const response = await this.usersService.login(this.email, this.password);
  }

}
