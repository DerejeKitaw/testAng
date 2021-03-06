import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IProject } from '../../project';
import { InverterService } from '../../../inverters/service/inverter.service';
import { IInverter } from '../../../inverters/inverter';
import { PanelService } from '../../../panels/service/panel.service';
import { IPanel } from '../../../panels/panel';

@Component({
  selector: 'pv-project-edit-tags',
  templateUrl: './project-edit-tags.component.html',
  styleUrls: ['./project-edit-tags.component.scss']
})
export class ProjectEditTagsComponent implements OnInit {
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
  @ViewChild(NgForm) projectForm: NgForm;

  errorMessage: string;
  project: IProject;
  constructor(
    private route: ActivatedRoute,
    private inverterService: InverterService,
    private panelService: PanelService
  ) {}

  ngOnInit(): void {
    //#region get all inverters data async
    this.inverterService.getInverters().subscribe(
      inverters => {
        // both inverters and filteredInverters are same initialy
        this.inverters = inverters;
        console.log('inverters: ' + inverters);
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
        console.log('panels: ' + panels);
        this.getPanelList();
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
}
