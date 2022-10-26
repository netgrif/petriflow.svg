import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import {PetriflowCanvasConfigurationService} from './services/petriflow-canvas-configuration.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PetriflowCanvas} from './petriflow-canvas';
import {GridConfiguration} from './grid-configuration';
import Panzoom from '@panzoom/panzoom';
import {PetriflowCanvasConfiguration} from './petriflow-canvas-configuration';

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
    private _canvas: PetriflowCanvas | undefined;

    constructor(private _canvasService: PetriflowCanvasService,
                private _canvasConfig: PetriflowCanvasConfigurationService,
                private _snackBar: MatSnackBar
    ) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement?.nativeElement, this.canvasDefsElement?.nativeElement);
        this._canvas.container.appendChild(this.canvasGridElement?.nativeElement);
        this._canvasService.canvas = this._canvas;
        this._canvasService.panzoom = Panzoom(this.canvasElement?.nativeElement, {
            canvas: true,
            contain: 'outside',
            maxScale: 10,
            minScale: 0.5
        });
        this.canvasElement?.nativeElement.parentElement.addEventListener('wheel', this._canvasService.panzoom.zoomWithWheel);
    }

    get canvas(): PetriflowCanvas | undefined {
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
        this._canvasService.panzoom?.reset();
    }

    @HostListener('window:keydown.+', ['$event'])
    onPlusButton() {
        this._canvasService.panzoom?.zoomIn();
    }

    // TODO: fix move on zoom
    @HostListener('window:keydown.-', ['$event'])
    onMinusButton() {
        this._canvasService.panzoom?.zoomOut();
    }

    @HostListener('window:keydown.ArrowUp', ['$event'])
    onUpButton() {
        this._canvasService.panzoom?.pan(0, PetriflowCanvasConfiguration.PANZOOM_MOVE, {relative: true});
    }

    @HostListener('window:keydown.ArrowRight', ['$event'])
    onRightButton() {
        this._canvasService.panzoom?.pan(-PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, {relative: true});
    }

    @HostListener('window:keydown.ArrowDown', ['$event'])
    onDownButton() {
        this._canvasService.panzoom?.pan(0, -PetriflowCanvasConfiguration.PANZOOM_MOVE, {relative: true});
    }

    @HostListener('window:keydown.ArrowLeft', ['$event'])
    onLeftButton() {
        this._canvasService.panzoom?.pan(PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, {relative: true});
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {duration: 1000});
    }
}
