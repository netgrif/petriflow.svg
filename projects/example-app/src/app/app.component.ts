import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {
    CanvasMode,
    PetriflowCanvasConfigurationService,
    PetriflowCanvasFactoryService,
    PetriflowCanvasService
} from 'petriflow-svg';
import {MatToolbar} from '@angular/material/toolbar';
import {MatDialog} from '@angular/material/dialog';
import {PetriflowInfoDialogComponent} from './petriflow-info-dialog/petriflow-info-dialog.component';
import {GridConfiguration} from '../../../petriflow-svg/src/lib/grid-configuration';

@Component({
    selector: 'pf-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild(MatToolbar) toolbar: MatToolbar | undefined;
    @ViewChild('canvasComponent') canvasComponent: ElementRef | undefined;
    public _mode: CanvasMode | undefined;
    public gridConfiguration = new GridConfiguration();

    constructor(private _petriflowCanvasService: PetriflowCanvasService, private _petriflowFactoryService: PetriflowCanvasFactoryService,
                private _petriflowConfigService: PetriflowCanvasConfigurationService, public dialog: MatDialog) {
        this._mode = _petriflowConfigService.mode;
    }

    ngAfterViewInit(): void {
        if (!this._petriflowCanvasService.canvas)
            throw new Error("Petriflow SVG canvas does not exists!");
        this._petriflowCanvasService.canvas.svg.onclick = (e) => {
            this.addTransition(e);
            this.addPlace(e);
        };
        if (!this.toolbar)
            throw new Error("MatToolbar could not be found!");
        this._petriflowConfigService.addCanvasEvent(this._petriflowCanvasService.canvas.svg, this.toolbar);
        this.toolbar._elementRef.nativeElement.onmouseenter = () => {
            this._petriflowConfigService.deleteClipboard();
        };
    }

    private addTransition($event: MouseEvent): void {
        if (this._petriflowConfigService.mode === CanvasMode.CREATE_TRANSITION) {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const transition = this._petriflowFactoryService.createTransition(new DOMPoint(($event.offsetX - (offset?.x ?? 0)) / (offset?.scale ?? 1),
                ($event.offsetY - (offset?.y ?? 0)) / (offset?.scale ?? 1)));
            this._petriflowConfigService.addTransitionEvents(transition);

        }
    }

    private addPlace(e: MouseEvent) {
        if (this._petriflowConfigService.mode === CanvasMode.CREATE_PLACE) {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const place = this._petriflowFactoryService.createPlace(0, new DOMPoint((e.offsetX - (offset?.x ?? 0)) / (offset?.scale ?? 1), (e.offsetY - (offset?.y ?? 0)) / (offset?.scale ?? 1)));
            this._petriflowConfigService.addPlaceEvents(place);
        }
    }

    disablePreviousArcMode() {
        if (this._petriflowFactoryService.arcLine) {
            this._petriflowCanvasService.canvas?.container.removeChild(this._petriflowFactoryService.arcLine);
            this._petriflowFactoryService.source = undefined;
            this._petriflowFactoryService.arcLine = undefined;
        }
    }

    changeCanvasMode(mode: CanvasMode, panzoomEnabled = true) {
        this.disablePreviousArcMode();
        this._petriflowConfigService.mode = mode;
        if (panzoomEnabled && this._petriflowCanvasService.panzoom?.isPaused()) {
            this._petriflowCanvasService.panzoom.resume();
        } else if (!panzoomEnabled && !this._petriflowCanvasService.panzoom?.isPaused()) {
            this._petriflowCanvasService.panzoom?.pause();
        }
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }

    resetPanZoom() {
        this._petriflowCanvasService.panzoom?.moveTo(0, 0);
        this._petriflowCanvasService.panzoom?.zoomAbs(0, 0, 1);
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
