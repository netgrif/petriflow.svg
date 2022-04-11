import { TestBed } from '@angular/core/testing';

import { PetriflowCanvasConfigurationService } from './petriflow-canvas-configuration.service';

describe('PetriflowCanvasConfigurationService', () => {
  let service: PetriflowCanvasConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetriflowCanvasConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
