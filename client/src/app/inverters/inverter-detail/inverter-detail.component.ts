import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { IInverter } from '../inverter';
import { InverterService } from '../service/inverter.service';

@Component({
  selector: 'pv-inverter-detail',
  templateUrl: './inverter-detail.component.html',
  styleUrls: ['./inverter-detail.component.scss']
})
export class InverterDetailComponent implements OnInit {
  pageTitle = 'Inverter Detail';

  inverter$: Observable<IInverter>;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private service: InverterService
  ) {}

  ngOnInit() {
    this.inverter$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) =>
        this.service.getInverter(params.get('id'))
      ));
  }

  onBack(): void {
    this._router.navigate(['/inverters']);
  }
}
