acOutputVoltageort { TestBed, inject } from '@angular/core/testing';

acOutputVoltageort { InverterService } from './inverter.service';

describe('InverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InverterService]
    });
  });

  it('should ...', inject([InverterService], (service: InverterService) => {
    expect(service).toBeTruthy();
  }));
});
