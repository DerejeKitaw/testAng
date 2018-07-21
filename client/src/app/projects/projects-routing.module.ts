import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectResolver } from './project.resolver';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectEditGuard } from './project-edit/project-edit.guard';
import { ProjectEditInfoComponent } from './project-edit/project-edit-info/project-edit-info.component';
import { ProjectEditTagsComponent } from './project-edit/project-edit-tags/project-edit-tags.component';
import { ProjectEditEquipmentsComponent } from './project-edit/project-edit-equipments/project-edit-equipments.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  {
    path: ':id',
    resolve: { project: ProjectResolver },
    component: ProjectDetailComponent
  },
  {
    path: ':id/edit',
    resolve: { project: ProjectResolver },
    canDeactivate: [ ProjectEditGuard ],
    component: ProjectEditComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: ProjectEditInfoComponent },
      { path: 'equipments', component: ProjectEditEquipmentsComponent },
      { path: 'tags', component: ProjectEditTagsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
