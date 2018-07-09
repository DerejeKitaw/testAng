import { Injectable } from '@angular/core';
import { IProject } from './project';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: IProject[];
  private _projectsUrl = 'api/projects';
  constructor(private _http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this._projectsUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getProject(id: number): Observable<IProject> {
    // if (id === 0) {
    //   return of(this.initializeProject());
    // }
    console.log(id);
    const url = `${this._projectsUrl}/${id}`;
    return this._http.get<IProject>(url).pipe(
      tap(data => console.log('Data: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
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

  deleteProject(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this._projectsUrl}/${id}`;
    return this._http.delete<IProject>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteProject: ' + id)),
        catchError(this.handleError)
      );
  }

  saveProject(project: IProject): Observable<IProject> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (project.projectId === '0') {
      return this.createProject(project, headers);
    }
    return this.updateProject(project, headers);
  }

  private createProject(project: IProject, headers: HttpHeaders): Observable<IProject> {
    project.projectId = undefined;
    return this._http.post<IProject>(this._projectsUrl, project, { headers: headers })
      .pipe(
        tap(data => console.log('createProject: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private updateProject(project: IProject, headers: HttpHeaders): Observable<IProject> {
    const url = `${this._projectsUrl}/${project.projectId}`;
    return this._http.put<IProject>(url, project, { headers: headers })
      .pipe(
        tap(data => console.log('updateProject: ' + project.projectId)),
        catchError(this.handleError)
      );
  }
  private initializeProject(): IProject {
    // Return an initialized object
    return {
      projectId: null,
      numberOfString: null,
      numberOfModuleInverter1String1: null,
      numberOfModuleInverter1String2: null,
      numberOfModuleInverter1String3: null,
      spaceAvailable: null,
      mainServiceBreakerSize: null,
      unFusedAcDisconnectAmpRating: null,
      acOutputVoltage: null,
      fusedAcDisconnectAmpRating: null,
      fuseSize: null,
      inverterMaxDcVoltage: null,
      nominalDcInputVoltage: null,
      ratedVoltage: null,
      inverter1Type: null,
      maxPowerOutput: null,
      inverterMaxPowerOutput: null,
      moduleSpec: null,
      inverterAcOutputVoltage: null,
      maxAcCurrentOutput: null,
      cec: null,
      optimizerMaxDcCurrentInput: null,
      optimizerMaxDcCurrentOutput: null,
      optimizerMaxPowerOutput: null,
      optimizerMaxDcVoltage: null,
      optimizerModel: null,
      panelMaxSystemVoltage: null,
      panelIsc: null,
      panelVoc: null,
      panelImp: null,
      panelVmp: null,
      panelPower: null,
      panelType: null,
      customerName: null,
      jobType: null,
      systemPower: null,
      adress1: null,
      adress2: null,
      drawingDate: null
    };
  }
}
