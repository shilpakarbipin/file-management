import {Component, OnInit, inject} from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule, UntypedFormGroup, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  btnStatus: string = 'Sign In';
  submitted: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;
  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  passwordLength: number = 6;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  title: string = 'Sign in to File Management';
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    this.initLoginForm()
  }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      password: [ '', Validators.compose([Validators.required, Validators.minLength(this.passwordLength)])],
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onUserLogin(loginDetails: any) {
    this.submitted = true;
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService
        .authenticate(loginDetails.username, loginDetails.password)
        .subscribe({
          next: async (loginResponse) => {
            console.log(loginResponse)
            await this.successLogin(loginResponse);
          },
          error: (error) => {
            this.submitted = false;
            this.loading = false;
            this.errorMessage = error.error.body.message;
            console.error(this.errorMessage);
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          },
          complete: async () => {
          },
        });
    }
  }

  async successLogin(loginResponse: any) {
    if (loginResponse.data && loginResponse) {
      localStorage['at'] = loginResponse.data.token;
      localStorage['username'] = loginResponse.data.userName;
    } else {
      this.loading = false;
    }
  }

}
