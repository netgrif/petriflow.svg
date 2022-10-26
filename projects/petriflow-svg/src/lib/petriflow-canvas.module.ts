import {NgModule} from '@angular/core';
import {PetriflowCanvasComponent} from './petriflow-canvas.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [PetriflowCanvasComponent],
    imports: [
        CommonModule
    ],
    exports: [PetriflowCanvasComponent]
})
export class PetriflowCanvasModule {
}
