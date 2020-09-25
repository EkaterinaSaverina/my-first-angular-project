import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { AuthService } from '../core/services';
import { User } from '../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin = true;
  formGroup: FormGroup;
  errors: string[];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  get isEmailEmpty(): boolean {
    return this.formGroup.get('email').hasError('required');
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  setActiveTab(index: number): void {
    this.isLogin = index == 0;

    this.initializeForm();
  }

  async submitForm(): Promise<void> {
    try {
      if (this.isLogin) {
        await this.login();
      } else {
        await this.register();
      }
      this.router.navigate(['/dashboard']);
    }
    catch (error) {
      this.errors = error;
    }
  }

  private initializeForm(): void {
    this.formGroup = new FormGroup({
      'email': new FormControl('', { validators: [Validators.email, Validators.required] }),
      'password': new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
    }, { updateOn: 'blur' });

    if (!this.isLogin) {
      this.formGroup.addControl('name', new FormControl('', { validators: [Validators.required] }));
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  async login(): Promise<void> {
    const data = this.formGroup.value;

    await this.authService.login(data as User);
  }

  async register(): Promise<void> {
    const data = this.formGroup.value;

    await this.authService.register(data as User);
  }
}
