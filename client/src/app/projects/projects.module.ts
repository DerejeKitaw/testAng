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
import { ProjectEditGuard } from './project-edit/project-edit.guard';
import { InverterService } from '../inverters/service/inverter.service';
import { PanelService } from '../panels/service/panel.service';
import { OptimizerService } from '../optimizers/service/optimizer.service';
import { ProjectEditEquipmentsComponent } from './project-edit/project-edit-equipments/project-edit-equipments.component';

@NgModule({
  imports: [SharedModule, ProjectsRoutingModule],
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectEditInfoComponent,
    ProjectEditTagsComponent,
    ProjectEditEquipmentsComponent
  ],
  providers: [
    InverterService,
    PanelService,
    OptimizerService,
    ProjectService,
    ProjectResolver,
    ProjectParameterService,
    ProjectEditGuard
  ]
})
export class ProjectsModule {}
