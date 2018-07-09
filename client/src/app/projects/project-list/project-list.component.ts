import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../project.service';
import { IProject } from '../project';
import { ProjectParameterService } from '../project-parameter.service';
@Component({
  selector: 'pv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  pageTitle = 'Project List';
  filteredProjects: IProject[];
  projects: IProject[];
  errorMessage: string;
  get listFilter(): string {
    return this.projectParameterService.filterBy;
  }
  set listFilter(value: string) {
    this.projectParameterService.filterBy = value;
    this.filteredProjects = this.performFilter(this.listFilter);
  }
  constructor(
    private _projectService: ProjectService,
    private projectParameterService: ProjectParameterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._projectService.getProject().subscribe(projects => {
      this.projects = projects;
    }, error => (this.errorMessage = <any>error));
  }

    // Local filter
    performFilter(filterBy: string): IProject[] {
      if (filterBy) {
          filterBy = filterBy.toLocaleLowerCase();
          return this.projects.filter((project: IProject) =>
              project.projectId.toLocaleLowerCase().indexOf(filterBy) !== -1);
      } else {
          return this.projects;
      }
  }
}
