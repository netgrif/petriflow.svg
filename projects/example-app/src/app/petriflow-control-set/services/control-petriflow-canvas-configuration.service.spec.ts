import { TestBed } from '@angular/core/testing';

import { ControlPetriflowCanvasConfigurationService } from './control-petriflow-canvas-configuration.service';

describe('ControlPetriflowCanvasConfigurationService', () => {
  let service: ControlPetriflowCanvasConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlPetriflowCanvasConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
