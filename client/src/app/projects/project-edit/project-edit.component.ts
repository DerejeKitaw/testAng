import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProject } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'pv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  pageTitle = 'Project Edit';
  errorMessage: string;

  private currentProject: IProject;
  private originalProject: IProject;
  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
      return JSON.stringify(this.originalProject) !== JSON.stringify(this.currentProject);
  }

  get project(): IProject {
      return this.currentProject;
  }
  set project(value: IProject) {
      this.currentProject = value;
      // Clone the object to retain a copy
      this.originalProject = Object.assign({}, value);
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService) { }

  ngOnInit(): void {
      // Watch for changes to the resolve data
      this.route.data.subscribe(data => {
        console.log(data);
          this.onProjectRetrieved(data['project']);
      });
  }

  onProjectRetrieved(project: IProject): void {
      this.project = project;

      // Adjust the title
      if (this.project.projectId === '0') {
          this.pageTitle = 'Add Project';
      } else {
          this.pageTitle = `Edit Project: ${this.project.customerName}`;
      }
  }

  deleteProject(): void {
      if (this.project.projectId === '0') {
          // Don't delete, it was never saved.
          this.onSaveComplete(`${this.project.customerName} was deleted`);
      } else {
          if (confirm(`Really delete the project: ${this.project.customerName}?`)) {
              this.projectService.deleteProject(this.project.projectId).subscribe(
                  () => this.onSaveComplete(`${this.project.customerName} was deleted`)
              );
          }
      }
  }

  isValid(path?: string): boolean {
      // this.validate();
      if (path) {
          return this.dataIsValid[path];
      }
      return (this.dataIsValid &&
          Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  saveProject(): void {
      if (this.isValid()) {
          this.projectService.saveProject(this.project).subscribe(
              () => this.onSaveComplete(`${this.project.customerName} was saved`)
          );
      } else {
          this.errorMessage = 'Please correct the validation errors.';
      }
  }

  onSaveComplete(message?: string): void {
      console.log(message);
      this.reset();
      // Navigate back to the project list
      this.router.navigate(['/projects']);
  }

  // Reset the data
  // Required after a save so the data is no longer seen as dirty.
  reset(): void {
      this.dataIsValid = null;
      this.currentProject = null;
      this.originalProject = null;
  }
}
