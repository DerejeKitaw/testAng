import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProject } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'pv-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  pageTitle = 'Project Detail';
  project: IProject;
  errorMessage: string;

  constructor(private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.data['project']);
    this.project = this.route.snapshot.data['project'][0];
    // console.log("this.project " + JSON.stringify(this.project[0]) );
  }

  onBack(): void {
      this.router.navigate(['/projects']);
  }
}
