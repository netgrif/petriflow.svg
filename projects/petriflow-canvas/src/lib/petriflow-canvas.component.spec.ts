import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetriflowCanvasComponent} from './petriflow-canvas.component';

describe('PetriflowCanvasComponent', () => {
    let component: PetriflowCanvasComponent;
    let fixture: ComponentFixture<PetriflowCanvasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PetriflowCanvasComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PetriflowCanvasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
