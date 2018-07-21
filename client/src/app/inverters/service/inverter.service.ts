import { Injectable } from '@angular/core';
// for HttpClient work , need to import HttpClientModule in modules Angula4
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
import { IInverter } from '../inverter';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

@Injectable()
export class InverterService {
// To access api update .angular-cli.json
private _inverterUrl = 'api/inverters';

  constructor( private _http: HttpClient) { }

getInverters(): Observable<IInverter[]> {
  return this._http.get<IInverter[]>(this._inverterUrl).pipe(
    tap(data => console.log('All: ' + JSON.stringify(data))),
    catchError(this.handleError)
  );
}

getInverter(id: number | string) {
  console.log('id= ' + id);
  return this.getInverters()
    // (+) before `id` turns the string into a number
    // very important if id is string do not add '+'
    .pipe(map(inverters => inverters.find(inverter => inverter.id === +id)));
}


private handleError(err: HttpErrorResponse) {
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
  return Observable.throw(errorMessage);
}
}
