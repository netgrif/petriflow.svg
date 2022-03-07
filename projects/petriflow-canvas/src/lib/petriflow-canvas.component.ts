import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';
import {Canvas} from '../../../canvas/src/lib/canvas/canvas';

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
