import { TestBed, inject } from '@angular/core/testing';

import { PanelEditGuardService } from './panel-edit-guard.service';

describe('PanelEditGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelEditGuardService]
    });
  });

  it('should ...', inject([PanelEditGuardService], (service: PanelEditGuardService) => {
    expect(service).toBeTruthy();
  }));
});
