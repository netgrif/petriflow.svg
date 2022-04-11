import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';
import createPanZoom from 'panzoom';
import {PetriflowCanvasConfigurationService} from './services/petriflow-canvas-configuration.service';

@Component({
    selector: 'lib-petriflow-canvas',
    templateUrl: './petriflow-canvas.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef;
    private _canvas: PetriflowCanvas;

    constructor(private _canvasService: PetriflowCanvasService, private _canvasConfiguration: PetriflowCanvasConfigurationService) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement.nativeElement);
        this._canvasService.canvas = this._canvas;
        this._canvasService.panzoom = createPanZoom(this._canvas.container);
    }

    get canvas(): PetriflowCanvas {
        return this._canvas;
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown($event: KeyboardEvent) {
        if (($event.ctrlKey || $event.metaKey)) {
            $event.preventDefault();
            if ($event.key === 'd' || $event.key === 'D') {
                console.log('on ctrl d');
            } else if ($event.key === 'c' || $event.key === 'C') {
                this._canvasService.copyElements();
            } else if ($event.key === 'v' || $event.key === 'V') {
                this._canvasService.pasteElements();
            } else if ($event.key === 'a' || $event.key === 'A') {
                this._canvasService.selectAll();
            }
        }
    }

    @HostListener('window:keydown.delete', ['$event'])
    onDelete() {
        this._canvasService.deleteSelectedElements();
    }

    @HostListener('window:keydown.escape', ['$event'])
    onEscape() {
        console.log('escape');
    }
}
