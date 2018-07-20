import { Component, OnInit } from '@angular/core';
import { IPanel } from '../panel';
import { PanelService } from '../service/panel.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss']
})
export class PanelListComponent implements OnInit {
  pageTitle = 'Panel List';
  errorMessage: string;
  filteredPanels: IPanel[];
  panels: IPanel[];
  // get panels(): IPanel[] {
  //     return this.panelService.panels;
  // }

  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  // when listFilter change perform filter
  set listFilter(value: string) {
    console.log('list filter by - ' + value);
    this._listFilter = value;
    // If listFilter is null return all panels
    console.log('this.listFilter value = ' + this.listFilter);
    this.filteredPanels = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.panels;
    console.log('this.panels value = ' + JSON.stringify(this.filteredPanels));
  }
  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute
  ) {
    console.log('panelListCompnent works');
  }

  ngOnInit(): void {
    console.log('panelListCompnent works');
    // get all panels async
    this.panelService.getPanels().subscribe(
      panels => {
        // both panels and filteredPanels are same initialy
        this.panels = panels;
        this.filteredPanels = this.panels;
      },
      // error => this.errorMessage = <any>error); // TODO: log this to error log in production.
      error =>
        (this.errorMessage =
          'There is problem in the server. Please contact your server adminstrator.')
    );
  }
  performFilter(filterBy: string): IPanel[] {
    console.log('performFilter run ');
    filterBy = filterBy.toLocaleLowerCase();
    return this.panels.filter(
      (panel: IPanel) =>
        panel.panelType.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}
