import { Component, OnInit } from '@angular/core';
import { IInverter } from '../inverter';
import { InverterService } from '../service/inverter.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'inverter-list',
  templateUrl: './inverter-list.component.html',
  styleUrls: ['./inverter-list.component.scss']
})
export class InverterListComponent implements OnInit {
  pageTitle: string = 'Inverter List';
  errorMessage: string;
  filteredInverters: IInverter[];
  inverters: IInverter[];
  // get inverters(): IInverter[] {
    //     return this.inverterService.inverters;
    // }
    
    private _listFilter: string;
    
    get listFilter(): string {
      return this._listFilter;
    }
    // when listFilter change perform filter
    set listFilter(value: string) {
      console.log("list filter by - "+ value);
      this._listFilter = value;
      // If listFilter is null return all inverters
      console.log("this.listFilter value = "+this.listFilter)
      this.filteredInverters = this.listFilter ? this.performFilter(this.listFilter) : this.inverters;
      console.log("this.inverters value = "+ JSON.stringify(this.filteredInverters));

    }
  constructor(private inverterService: InverterService,
    private route: ActivatedRoute) { 
    console.log("inverterListCompnent works");
  }
  
  ngOnInit(): void {
    console.log("inverterListCompnent works");
    // get all inverters async
    this.inverterService.getInverters()
    .subscribe(inverters => {
      // both inverters and filteredInverters are same initialy
        this.inverters = inverters;
        this.filteredInverters = this.inverters;
    },
        // error => this.errorMessage = <any>error); // TODO: log this to error log in production.
         error => this.errorMessage = "There is problem in the server. Please contact your server adminstrator.");
  }
  performFilter(filterBy: string): IInverter[] {
    console.log("performFilter run ");    
    filterBy = filterBy.toLocaleLowerCase();
    return this.inverters.filter((inverter: IInverter) =>
          inverter.inverterType.toLocaleLowerCase().indexOf(filterBy) !== -1);
}




  
}
