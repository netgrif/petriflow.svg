import {AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import {PetriflowCanvas} from './petriflow-canvas';
import {GridConfiguration} from './grid-configuration';
import Panzoom, {PanzoomOptions} from '@panzoom/panzoom';

@Component({
    selector: 'petriflow-svg-canvas',
    templateUrl: './petriflow-canvas.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef | undefined;
    @ViewChild('canvasDefs') canvasDefsElement: ElementRef | undefined;
    @ViewChild('canvasGrid') canvasGridElement: ElementRef | undefined;
    @Input() gridConfiguration: GridConfiguration = new GridConfiguration();
    @Input() panzoomConfiguration: PanzoomOptions = {
        canvas: true,
        contain: 'outside',
        cursor: 'auto',
        maxScale: 10,
        minScale: 0.5,
        step: 0.2
    };
    private _canvas: PetriflowCanvas | undefined;

    constructor(private _canvasService: PetriflowCanvasService) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement?.nativeElement, this.canvasDefsElement?.nativeElement);
        this._canvasService.canvas = this._canvas;
        this._canvasService.panzoom = Panzoom(this.canvasElement?.nativeElement, this.panzoomConfiguration);
        this.canvasElement?.nativeElement.parentElement.addEventListener('wheel', this._canvasService.panzoom.zoomWithWheel);
    }

    get canvas(): PetriflowCanvas | undefined {
        return this._canvas;
    }

    // TODO: PF-48 where hotkeys?
}
