import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../helper/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends BaseComponent implements OnInit   {

  loginForm: FormGroup;
  public formValid: Boolean = true;
  public invalidLogin: Boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
   ) {
    super();
   }

  ngOnInit() {
    this.buildForm();
  }

// validation for login
  buildForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

// login submit
  login(valid: boolean) {
    if (valid === true) {
      const userDetail = {
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password']
      };
      this.auth.login(userDetail)
        .subscribe(
          data => {
            if (data.status === 200) {
              this.isLogged(data.item);
            } else {
              this.invalidLogin = false;
            }
          },
          error => {
            console.log('Error:', error);
          });

    } else {
      this.formValid = false;
    }
  }

// login success
  isLogged(data) {
    localStorage.setItem('User', JSON.stringify({ user_id: data[0].id }));
    this.router.navigate(['home']);
  }

}
