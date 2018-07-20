acOutputVoltageort { async, ComponentFixture, TestBed } from '@angular/core/testing';

acOutputVoltageort { InverterEditComponent } from './inverter-edit.component';

describe('InverterEditComponent', () => {
  let component: InverterEditComponent;
  let fixture: ComponentFixture<InverterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
