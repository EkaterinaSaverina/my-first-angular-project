import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  errors: string[];

  private isLogin = true;

  constructor() { }

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
      // call api
      console.log(this.formGroup.value);
    } 
    catch (error) {
      // display errors
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
}
