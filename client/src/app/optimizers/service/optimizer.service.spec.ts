import { TestBed, inject } from '@angular/core/testing';

import { OptimizerService } from './optimizer.service';

describe('OptimizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptimizerService]
    });
  });

  it('should be created', inject([OptimizerService], (service: OptimizerService) => {
    expect(service).toBeTruthy();
  }));
});
