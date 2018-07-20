import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, tap, catchError } from 'rxjs/operators';


import { ProjectService } from '../projects/project.service';
// import { Project } from '../projects/project.model';
import { AuthService } from '../auth/auth.service';
import { IProject } from './project';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private projectService: ProjectService,
              private authService: AuthService) {
  }

  storeProjects() {
    const token = this.authService.token;

    return this.http.put('https://ng-recipe-book.firebaseio.com/projects.json?auth=' + token, this.projectService.getProjects());
  }

  getProjects() {
    const token = this.authService.token;

    this.http.get('https://ng-recipe-book.firebaseio.com/projects.json?auth=' + token)
      .pipe(map(
        (response: Response) => {
          const projects: IProject[] = response.json();
          for (const project of projects) {
            if (!project['ingredients']) {
              project['ingredients'] = [];
            }
          }
          return projects;
        }
      ))
      .subscribe(
        (projects: IProject[]) => {
          this.projectService.setProjects(projects);
        }
      );
  }
}
