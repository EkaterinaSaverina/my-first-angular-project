import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  logIn: boolean = true;
  email = 'fff';

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  changeActivity(isLogin:boolean): void {
    this.logIn = isLogin;
  }

}
