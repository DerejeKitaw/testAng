import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'pv-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessage: string;
    pageTitle = 'Log In';
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(loginForm: NgForm) {
    console.log('---onSignin---');
    if (loginForm && loginForm.valid) {
      const email = loginForm.form.value.email;
      const password = loginForm.form.value.password;
      this.authService.signinUser(email, password);

      if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
          this.router.navigate(['/projects']);
      }
  } else {
      this.errorMessage = 'Please enter a user name and password.';
  }
  }
}
