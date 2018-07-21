import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { IOptimizer } from '../optimizer';

@Injectable({
  providedIn: 'root'
})
export class OptimizerService {
// To access api update .angular-cli.json
private _optimizerUrl = 'api/optimizers';

constructor(private _http: HttpClient) {}

getOptimizers(): Observable<IOptimizer[]> {
  return this._http.get<IOptimizer[]>(this._optimizerUrl).pipe(
    tap(data => console.log('All: ' + JSON.stringify(data))),
    catchError(this.handleError)
  );
}
getOptimizer(id: number | string) {
  // console.log("id= "+id)
  return (
    this.getOptimizers()
      // (+) before `id` turns the string into a number
      // very important if id is string do not add '+'
      .pipe(map(optimizers => optimizers.find(optimizer => optimizer.id === +id))
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
