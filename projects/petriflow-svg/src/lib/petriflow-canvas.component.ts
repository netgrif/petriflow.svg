import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import createPanZoom from 'panzoom';
import {PetriflowCanvasConfigurationService} from './services/petriflow-canvas-configuration.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PetriflowCanvas} from './petriflow-canvas';
import {PetriflowCanvasConfiguration} from './petriflow-canvas-configuration';

@Component({
    selector: 'lib-petriflow-petri-svg',
    templateUrl: './petriflow-canvas.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef;
    private _canvas: PetriflowCanvas;
    private _mouseEvent: MouseEvent;

    constructor(private _canvasService: PetriflowCanvasService, private _canvasConfig: PetriflowCanvasConfigurationService,
                private _snackBar: MatSnackBar) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement.nativeElement);
        this._canvasService.canvas = this._canvas;
        this._canvasService.panzoom = createPanZoom(this._canvas.container);
    }

    get canvas(): PetriflowCanvas {
        return this._canvas;
    }

    @HostListener('window:keydown.control.c', ['$event'])
    onControlC($event: KeyboardEvent) {
        $event.preventDefault();
        this.openSnackBar('Canvas elements copied to clipboard');
        this._canvasService.petriflowClipboardElementsCollection = this._canvasService.copyElements(this._canvasService.petriflowElementsCollection,
            this._canvasService.petriflowClipboardElementsCollection);
    }

    @HostListener('window:keydown.control.v', ['$event'])
    onControlV($event: KeyboardEvent) {
        $event.preventDefault();
        this._canvasConfig.pasteElements();
    }

    @HostListener('window:keydown.control.a', ['$event'])
    onControlA($event: KeyboardEvent) {
        $event.preventDefault();
        this.openSnackBar('Selected all petri-svg elements');
        this._canvasService.selectAll();
    }

    @HostListener('window:keydown.delete', ['$event'])
    onDelete() {
        this.openSnackBar('All selected petri-svg elements deleted');
        this._canvasConfig.deleteSelectedElements();
    }

    @HostListener('window:keydown.escape', ['$event'])
    onEscape() {
        this._canvasService.deselectAll();
        this._canvasConfig.deleteClipboard();
    }

    @HostListener('window:keydown.+', ['$event'])
    onPlusButton() {
        this._canvasService.panzoom.smoothZoom(this._mouseEvent.x, this._mouseEvent.y, PetriflowCanvasConfiguration.PANZOOM_ZOOM_IN_MULTIPLIER);
    }

    @HostListener('window:keydown.-', ['$event'])
    onMinusButton() {
        this._canvasService.panzoom.smoothZoom(this._mouseEvent.x, this._mouseEvent.y, PetriflowCanvasConfiguration.PANZOOM_ZOOM_OUT_MULTIPLIER);
    }

    @HostListener('window:keydown.ArrowUp', ['$event'])
    onUpButton() {
        this._canvasService.panzoom.moveBy(0, PetriflowCanvasConfiguration.PANZOOM_MOVE, false);
    }

    @HostListener('window:keydown.ArrowRight', ['$event'])
    onRightButton() {
        this._canvasService.panzoom.moveBy(-PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, false);
    }

    @HostListener('window:keydown.ArrowDown', ['$event'])
    onDownButton() {
        this._canvasService.panzoom.moveBy(0, -PetriflowCanvasConfiguration.PANZOOM_MOVE, false);
    }

    @HostListener('window:keydown.ArrowLeft', ['$event'])
    onLeftButton() {
        this._canvasService.panzoom.moveBy(PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, false);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove($event: MouseEvent) {
        this._mouseEvent = $event;
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {duration: 1000});
    }
}
