import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PetriflowCanvasService} from '../../projects/petriflow-canvas/src/lib/petriflow-canvas.service';
import {MatToolbar} from '@angular/material/toolbar';
import {PetriflowCanvasFactoryService} from '../../projects/petriflow-canvas/src/lib/factories/petriflow-canvas-factory.service';
import {CanvasMode} from '../../projects/petriflow-canvas/src/lib/canvas-mode';
import {PetriflowCanvasConfigurationService} from '../../projects/petriflow-canvas/src/lib/services/petriflow-canvas-configuration.service';
import {MatDialog} from '@angular/material/dialog';
import {PetriflowInfoDialogComponent} from './petriflow-info-dialog/petriflow-info-dialog.component';

@Component({
    selector: 'nab-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild(MatToolbar) toolbar: MatToolbar;
    @ViewChild('canvasComponent') canvasComponent: ElementRef;
    public _mode: CanvasMode;

    constructor(private _petriflowCanvasService: PetriflowCanvasService, private _petriflowFactoryService: PetriflowCanvasFactoryService,
                private _petriflowConfigService: PetriflowCanvasConfigurationService, public dialog: MatDialog) {
        this._mode = _petriflowConfigService.mode;
    }

    ngAfterViewInit(): void {
        this._petriflowCanvasService.canvas.svg.onclick = (e) => {
            this.addTransition(e);
            this.addPlace(e);
        };
        this._petriflowConfigService.addCanvasEvent(this._petriflowCanvasService.canvas.svg, this.toolbar);
        this.toolbar._elementRef.nativeElement.onmouseenter = () => {
            this._petriflowConfigService.deleteClipboard();
        };
    }

    private addTransition($event): void {
        if (this._petriflowConfigService.mode === CanvasMode.CREATE_TRANSITION) {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const transition = this._petriflowFactoryService.createTransition(new DOMPoint(($event.x - offset.x) / offset.scale,
                ($event.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale));
            this._petriflowConfigService.addTransitionEvents(transition);

        }
    }

    private addPlace(e: MouseEvent) {
        if (this._petriflowConfigService.mode === CanvasMode.CREATE_PLACE) {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const place = this._petriflowFactoryService.createPlace(0, new DOMPoint((e.x - offset.x) / offset.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale));
            this._petriflowConfigService.addPlaceEvents(place);
        }
    }

    disablePreviousArcMode() {
        if (this._petriflowFactoryService.arcLine) {
            this._petriflowCanvasService.canvas.container.removeChild(this._petriflowFactoryService.arcLine);
            this._petriflowFactoryService.source = undefined;
            this._petriflowFactoryService.arcLine = undefined;
        }
    }

    changeCanvasMode(mode: CanvasMode, panzoomEnabled = true, cursor?: string) {
        this.disablePreviousArcMode();
        this._petriflowConfigService.mode = mode;
        if (panzoomEnabled && this._petriflowCanvasService.panzoom.isPaused()) {
            this._petriflowCanvasService.panzoom.resume();
        } else if (!panzoomEnabled && !this._petriflowCanvasService.panzoom.isPaused()) {
            this._petriflowCanvasService.panzoom.pause();
        }
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }

    public get canvasMode(): typeof CanvasMode {
        return CanvasMode;
    }

    openDialog() {
        this.dialog.open(PetriflowInfoDialogComponent);
    }
}
