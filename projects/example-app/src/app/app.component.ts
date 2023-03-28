import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {
    CanvasMode,
    GridConfiguration,
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
import {
    ControlPetriflowCanvasConfigurationService
} from "./petriflow-control-set/services/control-petriflow-canvas-configuration.service";

@Component({
    selector: 'pf-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        {provide: PetriflowCanvasService, useExisting: ControlPetriflowCanvasService},
        {provide: PetriflowCanvasConfiguration, useExisting: ControlPetriflowCanvasConfigurationService}
    ]
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvasComponent') canvasComponent: ElementRef | undefined;
    public _mode: CanvasMode | undefined;
    public gridConfiguration = new GridConfiguration();

    constructor(private _petriflowCanvasService: ControlPetriflowCanvasService,
                private _petriflowConfigService: ControlPetriflowCanvasConfigurationService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar) {
        this._mode = _petriflowConfigService.mode;
    }

    ngAfterViewInit(): void {
        if (!this._petriflowCanvasService.canvas) {
            throw new Error('Petriflow SVG canvas does not exists!');
        }
        this._petriflowCanvasService.canvas.svg.onclick = (e) => {
            this.addTransition(e);
            this.addPlace(e);
        };
        this._petriflowConfigService.addCanvasEvent(this._petriflowCanvasService.canvas.svg);
    }

    private addTransition($event: MouseEvent): void {
        if (this._petriflowConfigService.mode === CanvasMode.CREATE_TRANSITION) {
            const transition = new Transition(
                `t${++PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`,
                `t${PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`,
                new DOMPoint($event.offsetX, $event.offsetY)
            );
            const petriflowTransition = new PetriflowTransition(transition, undefined);
            this._petriflowCanvasService.createTransition(transition);
            this._petriflowCanvasService.petriflowElementsCollection.transitions.push(petriflowTransition);
            this._petriflowConfigService.addTransitionEvents(petriflowTransition);
        }
    }

    private addPlace($event: MouseEvent) {
        if (this._petriflowConfigService.mode === CanvasMode.CREATE_PLACE) {
            const place = new Place(
                `p${++PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`,
                `p${PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`,
                0,
                new DOMPoint($event.offsetX, $event.offsetY)
            );
            const petriflowPlace = new PetriflowPlace(place);
            this._petriflowCanvasService.createPlace(place);
            this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);
            this._petriflowConfigService.addPlaceEvents(petriflowPlace);
        }
    }

    @HostListener('window:keydown.control.c', ['$event'])
    onControlC($event: KeyboardEvent) {
        $event.preventDefault();
        this.openSnackBar('Canvas elements copied to clipboard');
        this._petriflowConfigService.copyElements();
    }

    @HostListener('window:keydown.control.v', ['$event'])
    onControlV($event: KeyboardEvent) {
        $event.preventDefault();
        this._petriflowConfigService.pasteElements();
    }

    @HostListener('window:keydown.control.a', ['$event'])
    onControlA($event: KeyboardEvent) {
        $event.preventDefault();
        this.openSnackBar('Selected all petri-svg elements');
        this._petriflowCanvasService.selectAll();
    }

    @HostListener('window:keydown.delete', ['$event'])
    onDelete() {
        this.openSnackBar('All selected petri-svg elements deleted');
        this._petriflowConfigService.deleteSelectedElements();
    }

    @HostListener('window:keydown.escape', ['$event'])
    onEscape() {
        this._petriflowCanvasService.deselectAll();
        this._petriflowConfigService.deleteClipboard();
        this._petriflowCanvasService.panzoom?.reset();
    }

    @HostListener('window:keydown.+', ['$event'])
    onPlusButton() {
        this._petriflowCanvasService.panzoom?.zoomIn();
    }

    // TODO: fix move on zoom
    @HostListener('window:keydown.-', ['$event'])
    onMinusButton() {
        this._petriflowCanvasService.panzoom?.zoomOut();
    }

    @HostListener('window:keydown.ArrowUp', ['$event'])
    onUpButton() {
        this._petriflowCanvasService.panzoom?.pan(0, PetriflowCanvasConfiguration.PANZOOM_MOVE, {relative: true});
    }

    @HostListener('window:keydown.ArrowRight', ['$event'])
    onRightButton() {
        this._petriflowCanvasService.panzoom?.pan(-PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, {relative: true});
    }

    @HostListener('window:keydown.ArrowDown', ['$event'])
    onDownButton() {
        this._petriflowCanvasService.panzoom?.pan(0, -PetriflowCanvasConfiguration.PANZOOM_MOVE, {relative: true});
    }

    @HostListener('window:keydown.ArrowLeft', ['$event'])
    onLeftButton() {
        this._petriflowCanvasService.panzoom?.pan(PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, {relative: true});
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {duration: 1000});
    }

    changeCanvasMode(mode: CanvasMode) {
        this._petriflowConfigService.disablePreviousArcMode();
        this._petriflowConfigService.mode = mode;
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }

    resetPanZoom() {
        this._petriflowCanvasService.panzoom?.reset();
    }

    public get canvasMode(): typeof CanvasMode {
        return CanvasMode;
    }

    openDialog() {
        this.dialog.open(PetriflowInfoDialogComponent);
    }

    gridOnOff() {
        this.gridConfiguration.enabled = !this.gridConfiguration.enabled;
    }
}
