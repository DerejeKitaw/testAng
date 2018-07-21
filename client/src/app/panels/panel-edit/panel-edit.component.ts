import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IPanel } from '../panel';
import { PanelService } from '../service/panel.service';

@Component({
  selector: 'pv-panel-edit',
  templateUrl: './panel-edit.component.html',
  styleUrls: ['./panel-edit.component.scss']
})
export class PanelEditComponent implements OnInit {
  pageTitle = 'Edit Panel';
  editForm: FormGroup;
  formError: { [id: string]: string };
  private validationMessages: { [id: string]: { [id: string]: string } };
  panel: IPanel;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private panelService: PanelService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize strings
    this.formError = {
      panelsManufacturer: '',
      panelType: '',
      power: '',
      vmp: '',
      imp: '',
      voc: '',
      isc: '',
      vocTempCoef: '',
      vmpTempCoef: '',
      iscTempCoef: ''
    };

    this.validationMessages = {
      panelsManufacturer: {
        required: 'Panel panelsManufacturer is required',
        minlength:
          'Panel panelsManufacturer must be at least three characters.',
        maxlength: 'Panel panelsManufacturer cannot exceed 50 characters.'
      },
      panelType: {
        required: 'Director is required',
        minlength: 'Director must be at least 5 characters.',
        maxlength: 'Director cannot exceed 50 characters.'
      },
      power: {
        range: 'Rate the panel between 1 (lowest) and 5 (highest).'
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getPanel(id);
    });
  }

  getPanel(id: number): void {
    this.panelService
      .getPanel(id)
      .subscribe(
        panel => this.onPanelRetrieved(panel),
        error => (this.errorMessage = <any>error)
      );
  }

  onPanelRetrieved(panel: IPanel): void {
    this.panel = panel;

    if (this.panel.id === 0) {
      this.pageTitle = 'Add Panel';
    } else {
      this.pageTitle = `Edit Panel : ${this.panel.panelsManufacturer}`;
    }

    this.editForm = this.fb.group({
      manufacturer: [
        this.panel.panelsManufacturer,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      panelType: [
        this.panel.panelType,
        [Validators.required, Validators.maxLength(50)]
      ],
      power: [this.panel.power],
      vmp: [this.panel.vmp],
      imp: [this.panel.imp],
      voc: [this.panel.voc],
      isc: [this.panel.isc],
      vocTempCoef: [this.panel.vocTempCoef],
      vmpTempCoef: [this.panel.vmpTempCoef],
      iscTempCoef: [this.panel.iscTempCoef]
    });

    this.editForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this.editForm.valueChanges
    //         .debounceTime(500)
    //         .subscribe(data => this.onValueChanged(data));
  }

  // Start of a generic validator
  onValueChanged(data: any): void {
    for (const field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        const hasError =
          this.editForm.controls[field].dirty &&
          !this.editForm.controls[field].valid;
        this.formError[field] = '';
        if (hasError) {
          for (const key in this.editForm.controls[field].errors) {
            if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
              this.formError[field] +=
                this.validationMessages[field][key] + ' ';
            }
          }
        }
      }
    }
  }

  savePanel(): void {
    console.log(this.editForm);
    if (this.editForm.dirty && this.editForm.valid) {
      this.panel = this.editForm.value;
      alert(`Panel: ${JSON.stringify(this.editForm.value)}`);
    }
  }
  onBack(): void {
    this._router.navigate(['/panels']);
  }
}
