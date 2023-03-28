import {Injectable} from '@angular/core';
import {
    PetriflowCanvasConfigurationService,CanvasMode, PetriflowNode, PetriflowArc

} from "@netgrif/petriflow.svg";
import {ControlPetriflowCanvasService} from "./control-petriflow-canvas.service";
import {CanvasElementCollection} from "../domain/canvas-element-collection";

@Injectable({
    providedIn: 'root'
})
export class ControlPetriflowCanvasConfigurationService extends PetriflowCanvasConfigurationService {

    private _clipboardBox: DOMRect | undefined;
    private _clipboard: SVGElement | undefined;

    constructor(private _petriflowCanvasService: ControlPetriflowCanvasService) {
        super(_petriflowCanvasService);
    }

    public addCanvasEvent(svg: SVGGElement) {
        svg.onpointermove = (e) => {
            this.customMouseMoveEvent(e);
            this.defaultMouseMoveEvent(e);
        }
        svg.onpointerdown = (e) => {
            this.customMouseDownEvent();
            this.defaultMouseDownEvent(e);
        }
        svg.onpointerup = (e) => {
            this.customMouseUpEvent();
            this.defaultMouseUpEvent(e);
        }
        svg.onpointerleave = () => {
            this.customMouseLeaveEvent();
            this.defaultMouseLeaveEvent();
        }
    }

    protected customMouseMoveEvent(e: MouseEvent) {
        if (this.mouseDown && this._mode === CanvasMode.LASSO) {
            this._petriflowCanvasService.deselectAll();
        }
        this.onCanvasMouseMoveClipboard(e);
    };

    private onCanvasMouseMoveClipboard(event: MouseEvent) {
        if (this._clipboard && this._clipboardBox) {
            const x = this._petriflowCanvasService.xOffset;
            const y = this._petriflowCanvasService.yOffset;
            const scale = this._petriflowCanvasService.scale;
            const mouseX = (event.x - (x ?? 0)) / (scale ?? 1) - (this._clipboardBox.x + this._clipboardBox.width / 2 - (x ?? 0)) / (scale ?? 1);
            const mouseY = (event.y - (y ?? 0)) / (scale ?? 1) - (this._clipboardBox.y + this._clipboardBox.height / 2 - (y ?? 0)) / (scale ?? 1);
            this._clipboard.setAttribute('transform', `matrix(1,0,0,1,${mouseX},${mouseY})`);
        }
    }

    protected customMouseDownEvent() {
        if (this._mode === CanvasMode.LASSO) {
            this._petriflowCanvasService.deselectAll();
        }
        this.onMouseMoveDownDestroyClipboard();
    }

    protected customMouseUpEvent() {
        if (this.mode === CanvasMode.LASSO && this.rectangle) {
            this._petriflowCanvasService.setSelectedByRectangleEnclosure(this.rectangle);
        }
    }

    protected customMouseLeaveEvent() {
        this.deleteClipboard();
    };

    deleteClipboard() {
        if (!this._petriflowCanvasService.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        if (this.clipboard) {
            this._petriflowCanvasService.canvas.container.removeChild(this.clipboard);
            this.clipboard = undefined;
            this._petriflowCanvasService.petriflowClipboardElementsCollection = new CanvasElementCollection();
        }
        if (this.rectangle) {
            this.mouseDown = false;
            this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
        if (this._arcLine) {
            this._petriflowCanvasService.canvas.container.removeChild(this._arcLine);
            this._arcLine = undefined;
            this.mouseDown = false;
        }
    }
}
