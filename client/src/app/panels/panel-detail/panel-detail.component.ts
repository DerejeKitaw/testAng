import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { IPanel } from '../panel';
import { PanelService } from '../service/panel.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'pv-panel-detail',
  templateUrl: './panel-detail.component.html',
  styleUrls: ['./panel-detail.component.scss']
})
export class PanelDetailComponent implements OnInit {
  pageTitle = 'Panel Detail';

  panel$: Observable<IPanel>;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private service: PanelService
  ) {}

  ngOnInit() {
    this.panel$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) =>
        this.service.getPanel(params.get('id'))));
        console.log(this.panel$);
  }

  onBack(): void {
    this._router.navigate(['/panels']);
  }
}
