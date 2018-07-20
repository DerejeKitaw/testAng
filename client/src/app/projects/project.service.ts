import { Injectable, OnInit } from '@angular/core';
import { IProject } from './project';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit {
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization':  `Bearer ${this.token}`
     })
   };
  projects: IProject[];
  token;
  private _projectsUrl = 'api/projects';
  constructor(private _http: HttpClient, private authService: AuthService) {}
  ngOnInit(): void {
    if (localStorage.jwtToken) {
      this.token = localStorage.jwtToken;

    }
    console.log('project service ngOninit' + localStorage.jwtToken );
  }

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this._projectsUrl)
    .pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
       catchError(this.handleError)
    );
  }
  getProject(id: number): Observable<IProject> {
    // if (id === 0) {
    //   return of(this.initializeProject());
    // }
    // console.log(id);
    const url = `${this._projectsUrl}/${id}`;
    return this._http.get<IProject>(url).pipe(
      // tap(data => console.log('Data: ' + JSON.stringify(data))),
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
    return this._http.delete<IProject>(url, { headers: headers }).pipe(
      tap(data => console.log('deleteProject: ' + id)),
      catchError(this.handleError)
    );
  }
  // .set('Authorization', `Bearer ${token}`)
  saveProject(project: IProject): Observable<IProject> {
    const token = localStorage.jwtToken;
    // console.log('---saveProject---' + token);
    httpOptions.headers = httpOptions.headers.set('Authorization', token);
    const url = `${this._projectsUrl}/${project.projectId}`;
    // console.log('---updateProject---' + JSON.stringify(httpOptions));
    return this._http.post<IProject>(url, project, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private createProject(project: IProject,
    headers: HttpHeaders
  ): Observable<IProject> {
    project.projectId = undefined;
    return this._http
      .post<IProject>(this._projectsUrl, project, { headers: headers })
      .pipe(
        tap(data => console.log('createProject: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // return this.http.put('https://ng-recipe-book.firebaseio.com/projects.json?auth=' + token, this.projectService.getProjects());

  private updateProject(project: IProject, headers: HttpHeaders): Observable<IProject> {
    // console.log('service.updateProject: ' + JSON.stringify(project));
    const url = `${this._projectsUrl}/${project.projectId}`;
    // console.log('url: ' + url); // url: api/projects/1246
    return this._http.post<IProject>(url, project, httpOptions).pipe(
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

  setProjects(projects: IProject[]) {
    this.projects = projects;
    // this.projectsChanged.next(this.projects.slice());
  }
}
