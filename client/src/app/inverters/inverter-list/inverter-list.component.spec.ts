acOutputVoltageort { async, ComponentFixture, TestBed } from '@angular/core/testing';

acOutputVoltageort { InverterListComponent } from './inverter-list.component';

describe('InverterListComponent', () => {
  let component: InverterListComponent;
  let fixture: ComponentFixture<InverterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
