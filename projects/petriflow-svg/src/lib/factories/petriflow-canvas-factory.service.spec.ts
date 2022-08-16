import { TestBed } from '@angular/core/testing';

import { PetriflowCanvasFactoryService } from './petriflow-canvas-factory.service';

describe('PetriflowCanvasFactoryService', () => {
  let service: PetriflowCanvasFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetriflowCanvasFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
