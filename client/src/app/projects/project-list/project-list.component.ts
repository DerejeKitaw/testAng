import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { IProject } from '../project';

@Component({
  selector: 'pv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: IProject[] = [];
  errorMessage: string;
  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this._projectService.getProject().subscribe(projects => {
      this.projects = projects;
    }, error => (this.errorMessage = <any>error));
  }
}
