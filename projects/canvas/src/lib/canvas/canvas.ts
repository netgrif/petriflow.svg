import {CanvasElement} from './svg-elements/svg-objects/canvas-element';
import {CanvasConfiguration} from './canvas-configuration';
import {ArcEnd} from './svg-elements/arc/arc-end/arc-end';
import {Container} from './svg-elements/svg-objects/container';

export class Canvas extends Container {

    private _svg: SVGSVGElement;
    private readonly _defs: SVGDefsElement;

    constructor(svg: SVGSVGElement) {
        super();
        this._svg = svg;
        this._defs = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'defs') as SVGDefsElement;
        this.svg.appendChild(this._defs);
        this.svg.appendChild(this.container);
    }

    public add(object: CanvasElement): void {
        this.container.appendChild(object.container);
    }

    public remove(element: CanvasElement): SVGGElement {
        return this.container.removeChild(element.container);
    }

    public removeAll(): void {
        this.container.childNodes.forEach(value => value.remove());
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
