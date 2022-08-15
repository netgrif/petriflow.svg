import {TestBed} from '@angular/core/testing';

import {PetriflowCanvasService} from './petriflow-canvas.service';

describe('PetriflowCanvasService', () => {
    let service: PetriflowCanvasService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PetriflowCanvasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
