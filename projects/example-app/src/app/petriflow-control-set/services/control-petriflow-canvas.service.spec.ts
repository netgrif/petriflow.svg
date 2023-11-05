import { TestBed } from '@angular/core/testing';

import { ControlPetriflowCanvasService } from './control-petriflow-canvas.service';

describe('CanvasElementService', () => {
  let service: ControlPetriflowCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlPetriflowCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
