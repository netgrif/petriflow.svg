import {CanvasConfiguration} from '../../../canvas-configuration';
import {CanvasElement} from '../../svg-objects/canvas-element';
import {ArcEnd} from '../arc-end/arc-end';
import {NodeElement} from '../../svg-objects/node-element';

export abstract class Arc extends CanvasElement {
    private _start: NodeElement;
    private _end: NodeElement;
    private _arcLineBackground: SVGPolylineElement;
    private _arcLine: SVGPolylineElement;
    private _arrow: ArcEnd;
    private _multiplicityElement: SVGTextElement;
    private _multiplicity: Text;
    private _linePoints: Array<DOMPoint>;

    protected constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super();
        this._start = start;
        this._end = end;
        this._linePoints = [];

        this._arcLineBackground = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        this._arcLineBackground.setAttributeNS(null, 'fill', 'none');
        this._arcLineBackground.setAttributeNS(null, 'stroke', 'white');
        this._arcLineBackground.setAttributeNS(null, 'stroke-width', '4');
        this.container.appendChild(this._arcLineBackground);

        this._arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        this._arcLine.setAttributeNS(null, 'fill', 'none');
        this._arcLine.setAttributeNS(null, 'stroke', 'black');
        this._arcLine.setAttributeNS(null, 'stroke-width', '2');
        this.container.appendChild(this._arcLine);

        this._multiplicityElement = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'text') as SVGTextElement;
        this._multiplicityElement.setAttributeNS(null, 'font-size', `${CanvasConfiguration.FONT.SIZE}`);
        this._multiplicityElement.setAttributeNS(null, 'font-family', CanvasConfiguration.FONT.FAMILY);
        this._multiplicity = document.createTextNode(multiplicityLabel);
        this._multiplicityElement.appendChild(this._multiplicity);
        this.container.appendChild(this._multiplicityElement);

        this._linePoints = [];
        if (linePoints && linePoints.length > 0) {
            this._linePoints.push(...linePoints);
        }

        this.arrow = this.createArcEnd();
        this.container.appendChild(this.arrow.arrow);

        this.move(start, end);
    }

    abstract createArcEnd(): ArcEnd;

    activate() {
        this.arcLine.setAttributeNS(null, 'class', 'svg-active-stroke');
        this.multiplicityElement.setAttributeNS(null, 'class', 'svg-active-fill');
        this.arrow.activate();
    }

    deactivate() {
        this.arcLine.setAttributeNS(null, 'class', 'svg-inactive-stroke');
        this.multiplicityElement.setAttributeNS(null, 'class', 'svg-inactive-fill');
        this.arrow.deactivate();
    }

    move(start: NodeElement, end: NodeElement) {
        const points = [start.position].concat(this._linePoints).concat(end.position);
        points[0] = start.getEdgeIntersection(points[1]);
        points[points.length - 1] = end.getEdgeIntersection(points[points.length - 2]);
        const arcLinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
        this._arcLine.setAttributeNS(null, 'points', arcLinePoints);
        this._arcLineBackground.setAttributeNS(null, 'points', arcLinePoints);
    }

    get arcLineBackground(): SVGPolylineElement {
        return this._arcLineBackground;
    }

    set arcLineBackground(value: SVGPolylineElement) {
        this._arcLineBackground = value;
    }

    get arcLine(): SVGPolylineElement {
        return this._arcLine;
    }

    set arcLine(value: SVGPolylineElement) {
        this._arcLine = value;
    }

    get arrow(): ArcEnd {
        return this._arrow;
    }

    set arrow(value: ArcEnd) {
        this._arrow = value;
    }

    get multiplicityElement(): SVGTextElement {
        return this._multiplicityElement;
    }

    set multiplicityElement(value: SVGTextElement) {
        this._multiplicityElement = value;
    }

    get multiplicity(): Text {
        return this._multiplicity;
    }

    set multiplicity(value: Text) {
        this._multiplicity = value;
    }

    get linePoints(): Array<DOMPoint> {
        return this._linePoints;
    }

    set linePoints(value: Array<DOMPoint>) {
        this._linePoints = value;
    }

    get start(): NodeElement {
        return this._start;
    }

    set start(value: NodeElement) {
        this._start = value;
    }

    get end(): NodeElement {
        return this._end;
    }

    set end(value: NodeElement) {
        this._end = value;
    }
}
