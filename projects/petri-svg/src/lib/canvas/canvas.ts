import {Arc, ArcEnd, Container, Place, Transition} from './svg-elements';
import {CanvasConfiguration} from './canvas-configuration';

export class Canvas extends Container {

    private _svg: SVGSVGElement;
    private readonly _defs: SVGDefsElement;
    private readonly _arcs: Container;
    private readonly _places: Container;
    private readonly _transitions: Container;

    constructor(svg: SVGSVGElement, defs?: SVGDefsElement) {
        super();
        this._svg = svg;
        if (!defs) {
            defs = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'defs') as SVGDefsElement;
        }
        this._defs = defs;
        this._arcs = new Container('arcs');
        this._places = new Container('places');
        this._transitions = new Container('transitions');
        this.container.appendChild(this._defs);
        this.container.appendChild(this._arcs.container);
        this.container.appendChild(this._places.container);
        this.container.appendChild(this._transitions.container);
        this.svg.appendChild(this.container);
    }

    public addArc(arc: Arc): void {
        this._arcs.container.appendChild(arc.container);
    }

    public addPlace(place: Place): void {
        this._places.container.appendChild(place.container);
    }

    public addTransition(transition: Transition): void {
        this._transitions.container.appendChild(transition.container);
        // TODO: PF-48 needed? why not in addPlace?
        // transition.setLabelText(transition.label.wholeText);
    }

    public removeArc(arc: Arc): SVGGElement {
        return this._arcs.container.removeChild(arc.container);
    }

    public removePlace(place: Place): SVGGElement {
        return this._places.container.removeChild(place.container);
    }

    public removeTransition(transition: Transition): SVGGElement {
        return this._transitions.container.removeChild(transition.container);
    }

    public removeAll(): void {
        while (this._arcs.container.firstChild) {
            this._arcs.container.removeChild(this._arcs.container.firstChild);
        }
        while (this._places.container.firstChild) {
            this._places.container.removeChild(this._places.container.firstChild);
        }
        while (this._transitions.container.firstChild) {
            this._transitions.container.removeChild(this._transitions.container.firstChild);
        }
    }

    public register(arcEnd: ArcEnd): void {
        this._defs.appendChild(arcEnd.arrow());
        this._defs.appendChild(arcEnd.activeArrow());
    }

    get svg(): SVGSVGElement {
        return this._svg;
    }

    set svg(value: SVGSVGElement) {
        this._svg = value;
    }
}
