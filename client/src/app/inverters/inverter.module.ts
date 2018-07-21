import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { InverterListComponent } from './inverter-list/inverter-list.component';
import { InverterDetailComponent } from './inverter-detail/inverter-detail.component';
import { InverterService } from './service/inverter.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InverterEditComponent } from './inverter-edit/inverter-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'inverters', component: InverterListComponent },
      {
        path: 'inverter/:id',
        // canActivate: [ InverterGuardService ],
        component: InverterDetailComponent
      },
      {
        path: 'inverter/:id/edit',
        // canActivate: [ InverterGuardService ],
        component: InverterEditComponent
      }
    ]),
    HttpClientModule, // add this module for angular4
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    InverterListComponent,
    InverterDetailComponent,
    InverterEditComponent
  ],
  providers: [InverterService]
})
export class InverterModule {}
