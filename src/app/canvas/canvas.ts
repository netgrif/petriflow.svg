import {CanvasElement} from './svg-elements/svg-objects/canvas-element';
import {CanvasConfiguration} from './canvas-configuration';
import {ArcEnd} from './svg-elements/arc/arc-end/arc-end';

export class Canvas {

    private _svg: SVGSVGElement;
    private _defs: SVGDefsElement;

    constructor(svg: SVGSVGElement) {
        this._svg = svg;
        this._defs = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'defs') as SVGDefsElement;
    }

    public add(object: CanvasElement): void {
        this._svg.appendChild(object.container);
    }

    public remove(element): any {
        return this._svg.removeChild(element);
    }

    public removeAll(): void {
        this._svg.childNodes.forEach(value => value.remove());
    }

    public register(arcEnd: ArcEnd): void {
        this._defs.appendChild(arcEnd.arrow);
    }

    get svg(): SVGSVGElement {
        return this._svg;
    }

    set svg(value: SVGSVGElement) {
        this._svg = value;
    }
}
