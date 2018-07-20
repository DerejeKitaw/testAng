import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { IUser } from './user';
import { ProjectService } from '../projects/project.service';

@Injectable()
export class AuthService {
  token: string;
  currentUser: IUser;
  redirectUrl: string;
  constructor(
    // private router: Router,
    private http: HttpClient,
    // private projectService: ProjectService
  ) {}
  isLoggedIn(): boolean {
    return !!this.currentUser;
}
  signinUser(email: string, password: string) {
    // console.log('---signinUser---');
    return this.http.post<any>('/api/users/login', { email: email, password: password })
    .subscribe(
      (userData) => {
        console.log('userData ' + userData);
        if ( userData.token) {
          if (localStorage.jwtToken) {
            localStorage.removeItem('jwtToken');
          }
          localStorage.setItem('jwtToken', userData.token);
        }
        this.token = userData.token;

      }
    );
}

  logout() {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
