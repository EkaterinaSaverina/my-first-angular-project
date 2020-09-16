import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  logIn: boolean = true;
  public users: Array<any>;

  @Input() title: string;

  constructor(private usersService: UsersService) { 
    this.users = usersService.getUsers();
  }

  ngOnInit(): void {
  }

  changeActivity(isLogin:boolean): void {
    this.logIn = isLogin;
  }

}
