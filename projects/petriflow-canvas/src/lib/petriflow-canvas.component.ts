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

    @HostListener('window:keydown', ['$event'])
    onKeyDown($event: KeyboardEvent) {
        if (($event.ctrlKey || $event.metaKey)) {
            $event.preventDefault();
            if ($event.key === 'd' || $event.key === 'D') {
                console.log('on ctrl d');
            } else if ($event.key === 'c' || $event.key === 'C') {
                this.openSnackBar('Canvas elements copied to clipboard');
                this._canvasService.petriflowClipboardElementsCollection = this._canvasService.copyElements(this._canvasService.petriflowElementsCollection,
                                                                                                            this._canvasService.petriflowClipboardElementsCollection);
            } else if ($event.key === 'v' || $event.key === 'V') {
                this._canvasConfig.pasteElements();
            } else if ($event.key === 'a' || $event.key === 'A') {
                this.openSnackBar('Selected all canvas elements');
                this._canvasService.selectAll();
            }
        }
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
