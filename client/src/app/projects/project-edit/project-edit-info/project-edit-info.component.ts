import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IProject } from '../../project';

@Component({
  selector: 'pv-project-edit-info',
  templateUrl: './project-edit-info.component.html',
  styleUrls: ['./project-edit-info.component.scss']
})
export class ProjectEditInfoComponent implements OnInit {
  @ViewChild(NgForm) projectForm: NgForm;

  errorMessage: string;
  project: IProject;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.parent.data.subscribe(data => {
        // console.log('data from project edit info' + JSON.stringify(data));

        this.project = data['project'][0];
        // console.log('data from project edit info' + JSON.stringify(this.project));

          if (this.projectForm) {
              this.projectForm.reset();
          }
      });
  }
}
