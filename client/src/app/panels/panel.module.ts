import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PanelListComponent } from './panel-list/panel-list.component';
import { PanelDetailComponent } from './panel-detail/panel-detail.component';
import { PanelService } from './service/panel.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PanelEditComponent } from './panel-edit/panel-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'panels', component: PanelListComponent },
      {
        path: 'panel/:id',
        // canActivate: [ PanelGuardService ],
        component: PanelDetailComponent
      },
      {
        path: 'panel/:id/edit',
        // canActivate: [ PanelGuardService ],
        component: PanelEditComponent
      }
    ]),
    HttpClientModule, // add this module for angular4
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [PanelListComponent, PanelDetailComponent, PanelEditComponent],
  providers: [PanelService]
})
export class PanelModule {}
