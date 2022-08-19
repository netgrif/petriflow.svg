import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetriflowCanvasComponent} from './petriflow-canvas.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";

describe('PetriflowCanvasComponent', () => {
    let component: PetriflowCanvasComponent;
    let fixture: ComponentFixture<PetriflowCanvasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
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
