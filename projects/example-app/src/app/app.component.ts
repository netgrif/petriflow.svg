import {AfterViewInit, Component, HostListener} from '@angular/core';
import {
    PetriflowCanvasConfiguration,
    PetriflowCanvasService,
    PetriflowPlace,
    PetriflowTransition
} from '@netgrif/petriflow.svg';
import {MatDialog} from '@angular/material/dialog';
import {PetriflowInfoDialogComponent} from './petriflow-info-dialog/petriflow-info-dialog.component';
import {Place, Transition} from "@netgrif/petri.svg";
import {ControlPetriflowCanvasService} from "./petriflow-control-set/services/control-petriflow-canvas.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CanvasMode} from './petriflow-control-set/domain/canvas-mode';

@Component({
    selector: 'pf-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        {provide: PetriflowCanvasService, useExisting: ControlPetriflowCanvasService}
    ]
})
export class AppComponent implements AfterViewInit {

    public _mode: CanvasMode | undefined;

    private _mouseEvent: MouseEvent | undefined;

    private readonly stepSize: number = 0.2;

    private readonly maxScale: number = 10;

    private readonly minScale: number = 0.5;

    public panzoomConfiguration = {
        canvas: true,
        contain: 'outside',
        cursor: 'auto',
        maxScale: this.maxScale,
        minScale: this.minScale
    };

    constructor(public petriflowCanvasService: ControlPetriflowCanvasService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar) {
        this._mode = petriflowCanvasService.mode;
    }

    ngAfterViewInit(): void {
        if (!this.petriflowCanvasService.canvas) {
            throw new Error('Petriflow SVG canvas does not exists!');
        }
        this.petriflowCanvasService.canvas.svg.onclick = (e) => {
            this.addTransition(e);
            this.addPlace(e);
        };
        this.petriflowCanvasService.addCanvasEvent(this.petriflowCanvasService.canvas.svg);
    }

    private addTransition($event: MouseEvent): void {
        if (this.petriflowCanvasService.mode === CanvasMode.CREATE_TRANSITION) {
            const transition = new Transition(
                `t${++PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`,
                `t${PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`,
                new DOMPoint($event.offsetX, $event.offsetY)
            );
            const petriflowTransition = new PetriflowTransition(transition, undefined);
            this.petriflowCanvasService.createTransition(transition);
            this.petriflowCanvasService.petriflowElementsCollection.transitions.push(petriflowTransition);
            this.petriflowCanvasService.addTransitionEvents(petriflowTransition);
        }
    }

    private addPlace($event: MouseEvent) {
        if (this.petriflowCanvasService.mode === CanvasMode.CREATE_PLACE) {
            const place = new Place(
                `p${++PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`,
                `p${PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`,
                0,
                new DOMPoint($event.offsetX, $event.offsetY)
            );
            const petriflowPlace = new PetriflowPlace(place);
            this.petriflowCanvasService.createPlace(place);
            this.petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);
            this.petriflowCanvasService.addPlaceEvents(petriflowPlace);
        }
    }

    @HostListener('window:keydown.control.c', ['$event'])
    onControlC($event: KeyboardEvent) {
        $event.preventDefault();
        this.openSnackBar('Canvas elements copied to clipboard');
        this.petriflowCanvasService.copyElementsToClipboard();
    }

    @HostListener('window:keydown.control.v', ['$event'])
    onControlV($event: KeyboardEvent) {
        $event.preventDefault();
        this.petriflowCanvasService.pasteElements();
    }

    @HostListener('window:keydown.control.a', ['$event'])
    onControlA($event: KeyboardEvent) {
        $event.preventDefault();
        this.openSnackBar('Selected all petri-svg elements');
        this.petriflowCanvasService.selectAll();
    }

    @HostListener('window:keydown.delete', ['$event'])
    onDelete() {
        this.openSnackBar('All selected petri-svg elements deleted');
        this.petriflowCanvasService.deleteSelectedElements();
    }

    @HostListener('window:keydown.escape', ['$event'])
    onEscape() {
        this.petriflowCanvasService.deselectAll();
        this.petriflowCanvasService.deleteClipboard();
        this.petriflowCanvasService.panzoom?.reset();
    }

    @HostListener('window:keydown.+', ['$event'])
    onPlusButton() {
        const newScale = !!this.petriflowCanvasService.panzoom?.getScale() ?
            this.petriflowCanvasService.panzoom?.getScale() + this.stepSize : 1.2;
        this.petriflowCanvasService.panzoom?.zoomToPoint(
            newScale > this.maxScale ? this.maxScale : newScale,
            {
                clientX: this._mouseEvent?.x ?? 0,
                clientY: this._mouseEvent?.y ?? 0
            }
        );
    }

    // TODO: fix move on zoom
    @HostListener('window:keydown.-', ['$event'])
    onMinusButton() {
        const newScale = !!this.petriflowCanvasService.panzoom?.getScale() ?
            this.petriflowCanvasService.panzoom?.getScale() - this.stepSize : 1.2;
        this.petriflowCanvasService.panzoom?.zoomToPoint(
            newScale < this.minScale ? this.minScale : newScale,
            {
                clientX: this._mouseEvent?.x ?? 0,
                clientY: this._mouseEvent?.y ?? 0
            }
        );
    }

    @HostListener('window:keydown.ArrowUp', ['$event'])
    onUpButton() {
        this.petriflowCanvasService.panzoom?.pan(0, PetriflowCanvasConfiguration.PANZOOM_MOVE, {relative: true});
    }

    @HostListener('window:keydown.ArrowRight', ['$event'])
    onRightButton() {
        this.petriflowCanvasService.panzoom?.pan(-PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, {relative: true});
    }

    @HostListener('window:keydown.ArrowDown', ['$event'])
    onDownButton() {
        this.petriflowCanvasService.panzoom?.pan(0, -PetriflowCanvasConfiguration.PANZOOM_MOVE, {relative: true});
    }

    @HostListener('window:keydown.ArrowLeft', ['$event'])
    onLeftButton() {
        this.petriflowCanvasService.panzoom?.pan(PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, {relative: true});
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove($event: MouseEvent) {
        this._mouseEvent = $event;
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {duration: 1000});
    }

    changeCanvasMode(mode: CanvasMode) {
        this.petriflowCanvasService.disablePreviousArcMode();
        this.petriflowCanvasService.mode = mode;
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }

    public get canvasMode(): typeof CanvasMode {
        return CanvasMode;
    }

    resetPanZoom() {
        this.petriflowCanvasService.panzoom?.reset();
    }

    openDialog() {
        this.dialog.open(PetriflowInfoDialogComponent);
    }
}
