import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import createPanZoom from 'panzoom';
import {PetriflowCanvasConfigurationService} from './services/petriflow-canvas-configuration.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PetriflowCanvas} from './petriflow-canvas';

@Component({
    selector: 'lib-petriflow-canvas',
    templateUrl: './petriflow-canvas.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef;
    private _canvas: PetriflowCanvas;

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
        this.openSnackBar('Selected all canvas elements');
        this._canvasService.selectAll();
    }

    @HostListener('window:keydown.delete', ['$event'])
    onDelete() {
        this.openSnackBar('All selected canvas elements deleted');
        this._canvasConfig.deleteSelectedElements();
    }

    @HostListener('window:keydown.escape', ['$event'])
    onEscape() {
        this._canvasService.deselectAll();
        this._canvasConfig.deleteClipboard();
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {duration: 1000});
    }
}
