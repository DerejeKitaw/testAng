acOutputVoltageort { async, ComponentFixture, TestBed } from '@angular/core/testing';

acOutputVoltageort { InverterDetailComponent } from './inverter-detail.component';

describe('InverterDetailComponent', () => {
  let component: InverterDetailComponent;
  let fixture: ComponentFixture<InverterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
