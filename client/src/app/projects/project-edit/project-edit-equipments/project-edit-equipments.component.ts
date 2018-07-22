import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IProject } from '../../project';
import { InverterService } from '../../../inverters/service/inverter.service';
import { IInverter } from '../../../inverters/inverter';
import { PanelService } from '../../../panels/service/panel.service';
import { IPanel } from '../../../panels/panel';
import { IOptimizer } from '../../../optimizers/optimizer';
import { OptimizerService } from '../../../optimizers/service/optimizer.service';

@Component({
  selector: 'pv-project-edit-equipments',
  templateUrl: './project-edit-equipments.component.html',
  styleUrls: ['./project-edit-equipments.component.scss']
})
export class ProjectEditEquipmentsComponent implements OnInit {
// Inverter
inverterList: IInverter[];
inverterId: Number;
inverters: IInverter[];
inverter: IInverter;
// Panel
panelList: IPanel[];
panelId: Number;
panels: IPanel[];
panel: IPanel;
// Optimizer
optimizerList: IOptimizer[];
optimizerId: Number;
optimizers: IOptimizer[];
optimizer: IOptimizer;
@ViewChild(NgForm) projectForm: NgForm;

errorMessage: string;
project: IProject;
constructor(
  private route: ActivatedRoute,
  private inverterService: InverterService,
  private panelService: PanelService,
  private optimizerService: OptimizerService
) {}

ngOnInit(): void {
  //#region get all inverters data async
  this.inverterService.getInverters().subscribe(
    inverters => {
      // both inverters and filteredInverters are same initialy
      this.inverters = inverters;
      console.log('inverters: ' + JSON.stringify(inverters));
      this.getInverterList();
    },
    // error => this.errorMessage = <any>error); // TODO: log this to error log in production.
    error =>
      (this.errorMessage =
        'There is problem in the server. Please contact your server adminstrator.')
  );
  //#endregion
  //#region get all panels data async
  this.panelService.getPanels().subscribe(
    panels => {
      // both panels and filteredPanel are same initialy
      this.panels = panels;
      // console.log('panels: ' + panels);
      this.getPanelList();
    },
    // error => this.errorMessage = <any>error); // TODO: log this to error log in production.
    error =>
      (this.errorMessage =
        'There is problem in the server. Please contact your server adminstrator.')
  );
  //#endregion
  //#region get all optimizers data async
  this.optimizerService.getOptimizers().subscribe(
    optimizers => {
      // both optimizers and filteredOptimizer are same initialy
      this.optimizers = optimizers;
      // console.log('optimizers: ' + optimizers);
      this.getOptimizerList();
    },
    // error => this.errorMessage = <any>error); // TODO: log this to error log in production.
    error =>
      (this.errorMessage =
        'There is problem in the server. Please contact your server adminstrator.')
  );
  //#endregion

  this.route.parent.data.subscribe(data => {
    // console.log('data from project edit info' + JSON.stringify(data));

    this.project = data['project'][0];
    // console.log('data from project edit info' + JSON.stringify(this.project));
    // console.log('data :' + JSON.stringify(data));
    // data - all projects list - data :{"project":[{project1 Obj},{project1 Obj}]

    if (this.projectForm) {
      this.projectForm.reset();
    }
  });
}
getInverterList() {
  this.inverterList = this.inverters;
}
selectInverter() {
  alert(this.inverterId);
}
getPanelList() {
  this.panelList = this.panels;
}
selectPanel() {
  alert(this.panelId);
}
getOptimizerList() {
  this.optimizerList = this.optimizers;
}
selectOptimizer() {
  alert(this.optimizerId);
}
}
