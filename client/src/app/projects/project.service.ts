import { Injectable } from '@angular/core';
import { IProject } from './project';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: IProject[];
  private _projectsUrl = 'api/projects';
  constructor(private _http: HttpClient) {}

  getProject(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this._projectsUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError), );
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
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
