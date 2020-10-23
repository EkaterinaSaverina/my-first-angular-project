import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { User } from '../core/models';
import { AuthService, NotificationsService } from '../core/services';
import { UserService } from '../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin = true;
  formGroup: FormGroup;
  errorToShow: string;
  autocompleteControl = new FormControl();
  options: string[] = ['ek@mail.ru', 'kate@gmail.com', '15@mail.ru'];
  filteredOptions: Observable<string[]>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationsService: NotificationsService,
  ) { }

  private initializeForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', { validators: [Validators.email, Validators.required] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
    }, { updateOn: 'blur' });

    if (!this.isLogin) {
      this.formGroup.addControl('name', new FormControl('', { validators: [Validators.required] }));
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private async login(): Promise<void> {
    const data = this.formGroup.value;
    await this.authService.login(data as User);
    await this.userService.addUserToDatabase(data);
  }

  private async register(): Promise<void> {
    const data = this.formGroup.value;
    await this.authService.register(data as User);
    await this.userService.addUserToDatabase(data);
  }

  async submitForm(): Promise<void> {
    try {
      if (this.isLogin) {
        await this.login();
      } else {
        await this.register();
      }
      this.router.navigate(['']);
    }
    catch (error) {
      this.errorToShow = error.message;
      this.notificationsService.openSnackBar(this.errorToShow, 'close');
    }
  }

  changeForm(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.initializeForm();
  }

  isFieldEmpty(field: string): boolean {
    return this.formGroup.get(field).hasError('required');
  }

  ngOnInit(): void {
    this.initializeForm();
    // this.options = this.userService.getUsers();
    this.filteredOptions = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }
}
