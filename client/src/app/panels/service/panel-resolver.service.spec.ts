import { TestBed, inject } from '@angular/core/testing';

import { PanelResolverService } from './panel-resolver.service';

describe('PanelResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelResolverService]
    });
  });

  it('should ...', inject([PanelResolverService], (service: PanelResolverService) => {
    expect(service).toBeTruthy();
  }));
});
