import { Component, Input, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logIn: boolean = true;
  // email = 'fff';
  public users: Array<any>;
  email: string
  password: string

  @Input() title: string;

  constructor(private usersService: UsersService) {
    this.users = usersService.getUsers();
  }

  ngOnInit(): void {
  }

  changeActivity(isLogin: boolean): void {
    this.logIn = isLogin;
  }

  async login(event: Event): Promise<void> {
    const response = await this.usersService.login(this.email, this.password);
  }

}
