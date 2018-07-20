import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IInverter } from '../inverter';
import { InverterService } from '../service/inverter.service';

@Component({
  selector: 'pv-inverter-edit',
  templateUrl: './inverter-edit.component.html',
  styleUrls: ['./inverter-edit.component.scss']
})
export class InverterEditComponent implements OnInit {
  pageTitle = 'Edit Inverter';
  editForm: FormGroup;
  formError: { [id: string]: string };
  private validationMessages: { [id: string]: { [id: string]: string } };
  inverter: IInverter;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private inverterService: InverterService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize strings
    this.formError = {
      inverterManufacturer: '',
      inverterType: '',

      maxPowerOutput: '',
      acOutputVoltage: '',
      maxAcCurrentOutput: '',
      maxDcVoltage: '',
      startupVoltage: '',
      cec: ''
    };

    this.validationMessages = {
      inverterManufacturer: {
        required: 'Inverter inverterManufacturer is required',
        minlength:
          'Inverter inverterManufacturer must be at least three characters.',
        maxlength: 'Inverter inverterManufacturer cannot exceed 50 characters.'
      },
      inverterType: {
        required: 'Director is required',
        minlength: 'Director must be at least 5 characters.',
        maxlength: 'Director cannot exceed 50 characters.'
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getInverter(id);
    });
  }

  getInverter(id: number): void {
    this.inverterService
      .getInverter(id)
      .subscribe(
        inverter => this.onInverterRetrieved(inverter),
        error => (this.errorMessage = <any>error)
      );
  }

  onInverterRetrieved(inverter: IInverter): void {
    this.inverter = inverter;

    if (this.inverter.id === 0) {
      this.pageTitle = 'Add Inverter';
    } else {
      this.pageTitle = `Edit Inverter : ${this.inverter.inverterManufacturer}`;
    }

    this.editForm = this.fb.group({
      inverterManufacturer: [this.inverter.inverterManufacturer],
      inverterType: [this.inverter.inverterType, [Validators.required]],

      maxPowerOutput: [this.inverter.maxPowerOutput],
      acOutputVoltage: [this.inverter.acOutputVoltage],
      maxAcCurrentOutput: [this.inverter.maxAcCurrentOutput],
      maxDcVoltage: [this.inverter.maxDcVoltage],
      startupVoltage: [this.inverter.startupVoltage],
      cec: [this.inverter.cec]
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

  saveInverter(): void {
    console.log(this.editForm);
    if (this.editForm.dirty && this.editForm.valid) {
      this.inverter = this.editForm.value;
      alert(`Inverter: ${JSON.stringify(this.editForm.value)}`);
    }
  }
  onBack(): void {
    this._router.navigate(['/inverters']);
  }
}
