import { Injectable } from '@angular/core';
// for HttpClient work , need to import HttpClientModule in modules Angula4
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

import { IPanel } from '../panel';

@Injectable()
export class PanelService {
  // To access api update .angular-cli.json
  private _panelUrl = 'api/panels';

  constructor(private _http: HttpClient) {}

  getPanels(): Observable<IPanel[]> {
    return this._http.get<IPanel[]>(this._panelUrl).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getPanel(id: number | string) {
    // console.log("id= "+id)
    return (
      this.getPanels()
        // (+) before `id` turns the string into a number
        // very important if id is string do not add '+'
        .pipe(map(panels => panels.find(panel => panel.id === +id))
    ));
  }

  private handleError(err: HttpErrorResponse) {
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
    return Observable.throw(errorMessage);
  }
}
