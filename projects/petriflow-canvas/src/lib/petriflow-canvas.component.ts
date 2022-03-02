import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Canvas} from './canvas/canvas';
import {PetriflowCanvas} from './canvas/petriflow-canvas';
import {PetriflowCanvasService} from './petriflow-canvas.service';

@Component({
    selector: 'lib-petriflow-canvas',
    templateUrl: './petriflow-canvas.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef;
    private _canvas: Canvas;

    constructor(private _canvasService: PetriflowCanvasService) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement.nativeElement);
        this._canvasService.canvas = this._canvas;
    }

    get canvas(): Canvas {
        return this._canvas;
    }
}
