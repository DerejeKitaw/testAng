import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { IProject } from './project';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectResolver implements Resolve<IProject> {
  constructor(private projectService: ProjectService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProject> {
    const id = route.paramMap.get('id');
    console.log('route ' + route);
    return this.projectService.getProject(+id);
  }
}
