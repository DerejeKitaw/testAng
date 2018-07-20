import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private http: HttpClient) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  // signinUser(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         this.router.navigate(['/']);
  //         firebase.auth().currentUser.getIdToken()
  //           .then(
  //             (token: string) => this.token = token
  //           );
  //       }
  //     )
  //     .catch(
  //       error => console.log(error)
  //     );
  // }


  signinUser(email: string, password: string) {
    console.log('---signinUser---');
    return this.http.post<any>('/api/users/login', { email: email, password: password })
    .subscribe(
      (data) => {
        console.log(data);
        this.token = data.token;
        if (localStorage.jwtToken) {

          localStorage.removeItem('jwtToken');
        }
        localStorage.setItem('jwtToken', data.token);
      }
    );
    // .pipe(
    //   tap(data => console.log('All: ' + JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
    // .pipe(map(user => {
    //   console.log('---signinUser---' + user);
    //         // login successful if there's a jwt token in the response
    //         if (user && user.token) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //         }

    //         return user;
    //     }));
}

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.token = token
  //     );
  //     console.log(this.token);
  //   return this.token;
  // }

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
