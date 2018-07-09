import { TestBed, inject } from '@angular/core/testing';

import { ProjectParameterService } from './project-parameter.service';

describe('ProjectParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectParameterService]
    });
  });

  it('should be created', inject([ProjectParameterService], (service: ProjectParameterService) => {
    expect(service).toBeTruthy();
  }));
});
