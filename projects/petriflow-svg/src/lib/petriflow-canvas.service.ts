import {Injectable} from '@angular/core';
import {PetriflowCanvas} from './petriflow-canvas';
import {PanzoomObject} from '@panzoom/panzoom';
import {CanvasConfiguration, NodeElement, Place, StaticPlace, Transition} from "petri-svg";
import {PetriflowNode} from "./svg-elements/petriflow-node";

@Injectable({
    providedIn: 'root',
})
export abstract class PetriflowCanvasService {

    protected _canvas: PetriflowCanvas | undefined;
    protected _panzoom: PanzoomObject | undefined;

    protected constructor() {}

    public get panzoom(): PanzoomObject | undefined {
        return this._panzoom;
    }

    public set panzoom(value: PanzoomObject | undefined) {
        this._panzoom = value;
    }

    public get xOffset(): number | undefined {
        return this?._panzoom?.getPan()?.x;
    }

    public get yOffset(): number | undefined {
        return this?._panzoom?.getPan()?.y;
    }

    public get scale(): number | undefined {
        return this?._panzoom?.getScale();
    }

    public get canvas(): PetriflowCanvas | undefined {
        return this._canvas;
    }

    public set canvas(value: PetriflowCanvas | undefined) {
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
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        const rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
        rectangle.setAttributeNS(null, 'fill', 'none');
        rectangle.setAttributeNS(null, 'class', 'path');
        rectangle.setAttributeNS(null, 'stroke', 'black');
        rectangle.setAttributeNS(null, 'stroke-width', '1');
        rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
        rectangle.setAttributeNS(null, 'x', `${mouseX}`);
        rectangle.setAttributeNS(null, 'y', `${mouseY}`);
        this.canvas.container.appendChild(rectangle);
        return rectangle;
    }

    public createSvgArc(element: PetriflowNode<NodeElement>, arrowUrl: string): SVGPolygonElement {
        if (!this.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        const arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        arcLine.setAttributeNS(null, 'fill', 'none');
        arcLine.setAttributeNS(null, 'stroke', 'black');
        arcLine.setAttributeNS(null, 'stroke-width', '2');
        arcLine.setAttributeNS(null, 'marker-end', `url(#${arrowUrl})`);
        arcLine.setAttributeNS(null, 'points', `${element.getPosition().x},${element.getPosition().y} ${element.getPosition().x},${element.getPosition().y}`);
        this.canvas.container.appendChild(arcLine);
        return arcLine;
    }
}
