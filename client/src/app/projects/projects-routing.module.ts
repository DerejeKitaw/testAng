import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectResolver } from './project.resolver';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  {
    path: ':id',
    resolve: { project: ProjectResolver },
    component: ProjectDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
