import {ArcEnd, CanvasElement, Container} from './svg-elements';
import {CanvasConfiguration} from './canvas-configuration';

export class Canvas extends Container {

    private _svg: SVGSVGElement;
    private readonly _defs: SVGDefsElement;

    constructor(svg: SVGSVGElement, defs?: SVGDefsElement) {
        super();
        this._svg = svg;
        if (!defs) {
            defs = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'defs') as SVGDefsElement;
        }
        this._defs = defs;
        // this.svg.appendChild(this._defs);
        this.container.appendChild(this._defs);
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
