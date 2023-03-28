import {Injectable} from '@angular/core';
import {PetriflowCanvas} from './petriflow-canvas';
import {PanzoomObject} from '@panzoom/panzoom';
import {CanvasConfiguration, Place, StaticPlace, Transition} from "petri-svg";
import {CanvasMode} from "./canvas-mode";

@Injectable({
    providedIn: 'root',
})
export abstract class PetriflowCanvasService {

    private _canvas: PetriflowCanvas | undefined;
    private _panzoom: PanzoomObject | undefined;

    protected constructor() {}

    get panzoom(): PanzoomObject | undefined {
        return this._panzoom;
    }

    set panzoom(value: PanzoomObject | undefined) {
        this._panzoom = value;
    }

    get xOffset(): number | undefined {
        return this?._panzoom?.getPan()?.x;
    }

    get yOffset(): number | undefined {
        return this?._panzoom?.getPan()?.y;
    }

    get scale(): number | undefined {
        return this?._panzoom?.getScale();
    }

    get canvas(): PetriflowCanvas | undefined {
        return this._canvas;
    }

    set canvas(value: PetriflowCanvas | undefined) {
        this._canvas = value;
    }

    public disablePanning() {
        if (!!this.panzoom) {
            this.panzoom.setOptions({disablePan: true});
        }
    }

    public enablePanning() {
        if (!!this.panzoom) {
            this.panzoom.setOptions({disablePan: false});
        }
    }

    public createPlace(place: Place | StaticPlace): void {
        if (!this.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        this.canvas.add(place);
    }

    public createTransition(transition: Transition): void {
        if (!this.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        this.canvas.add(transition);
    }

    public createRectangle(mouseX: number, mouseY: number): SVGElement {
        const rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
        rectangle.setAttributeNS(null, 'fill', 'none');
        rectangle.setAttributeNS(null, 'class', 'path');
        rectangle.setAttributeNS(null, 'stroke', 'black');
        rectangle.setAttributeNS(null, 'stroke-width', '1');
        rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
        rectangle.setAttributeNS(null, 'x', `${mouseX}`);
        rectangle.setAttributeNS(null, 'y', `${mouseY}`);
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        this.canvas.container.appendChild(rectangle);
        return rectangle;
    }
}
