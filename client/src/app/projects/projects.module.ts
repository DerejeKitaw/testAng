import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { ProjectParameterService } from './project-parameter.service';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectEditInfoComponent } from './project-edit/project-edit-info/project-edit-info.component';
import { ProjectEditTagsComponent } from './project-edit/project-edit-tags/project-edit-tags.component';

@NgModule({
  imports: [SharedModule, ProjectsRoutingModule],
  declarations: [ProjectListComponent, ProjectDetailComponent, ProjectEditComponent, ProjectEditInfoComponent, ProjectEditTagsComponent],
  providers: [ProjectService, ProjectResolver, ProjectParameterService]
})
export class ProjectsModule {}
