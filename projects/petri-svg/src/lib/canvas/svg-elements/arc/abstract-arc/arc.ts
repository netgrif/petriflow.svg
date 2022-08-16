import {CanvasConfiguration} from '../../../canvas-configuration';
import {CanvasElement} from '../../svg-objects/canvas-element';
import {NodeElement} from '../../svg-objects/node-element';

export abstract class Arc extends CanvasElement {
    private _start: NodeElement;
    private _end: NodeElement;
    private _arcLineBackground: SVGPolylineElement;
    private _arcLine: SVGPolylineElement;
    private _multiplicityElement: SVGTextElement;
    private _multiplicity: Text;
    private _linePoints: Array<DOMPoint>;

    protected constructor(start: NodeElement, end: NodeElement, endId: string, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
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
        this._arcLine.setAttributeNS(null, 'marker-end', `url(#${endId})`);
        this.container.appendChild(this._arcLine);

        this._multiplicityElement = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'text') as SVGTextElement;
        this._multiplicityElement.setAttributeNS(null, 'font-size', `${CanvasConfiguration.FONT.SIZE}`);
        this._multiplicityElement.setAttributeNS(null, 'font-family', CanvasConfiguration.FONT.FAMILY);
        this._multiplicity = document.createTextNode(multiplicityLabel ?? '');
        this._multiplicityElement.appendChild(this._multiplicity);
        this.container.appendChild(this._multiplicityElement);

        start.arcs.push(this);
        end.arcs.push(this);

        if (linePoints && linePoints.length > 0) {
            this._linePoints.push(...linePoints);
        }

        this.move(start, end);
    }

    activate() {
        this.arcLine.setAttributeNS(null, 'class', 'svg-active-stroke');
        this.multiplicityElement.setAttributeNS(null, 'class', 'svg-active-fill');
    }

    deactivate() {
        this.arcLine.setAttributeNS(null, 'class', 'svg-inactive-stroke');
        this.multiplicityElement.setAttributeNS(null, 'class', 'svg-inactive-fill');
    }

    move(start: NodeElement, end: NodeElement) {
        const points = [start.position].concat(this._linePoints).concat(end.position);
        const backgroundPoints = Object.assign([] as DOMPoint[], points);
        points[0] = start.getEdgeIntersection(points[1], 0);
        points[points.length - 1] = end.getEdgeIntersection(points[points.length - 2], 1);
        const arcLinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

        backgroundPoints[0] = start.getEdgeIntersection(points[1], 2);
        backgroundPoints[points.length - 1] = end.getEdgeIntersection(points[points.length - 2], 2);
        this._arcLine.setAttributeNS(null, 'points', arcLinePoints);
        const arcLinePointsTest = backgroundPoints.map(p => `${p.x},${p.y}`).join(' ');
        this._arcLineBackground.setAttributeNS(null, 'points', arcLinePointsTest);
        const lastElement = this.arcLine.points.length - 1;
        const middleElement = parseInt(String(lastElement / 2), 10);

        const position = this.getArcWeightPosition(this.arcLine.points[middleElement], this.arcLine.points[middleElement + 1]);
        this._multiplicityElement.setAttributeNS(null, 'x', `${position.x}`);
        this._multiplicityElement.setAttributeNS(null, 'y', `${position.y}`);
    }

    getArcWeightPosition(startElement: SVGPoint, endElement: SVGPoint): DOMPoint {
        const startPointX = startElement.x;
        const startPointY = startElement.y;
        const endPointX = endElement.x;
        const endPointY = endElement.y;

        const dx = (endPointX - startPointX) / 2;
        const dy = (endPointY - startPointY) / 2;

        const length = Math.sqrt(dx * dx + dy * dy);
        const unitDx = dx / length;
        const unitDy = dy / length;
        let x;
        let y;

        if (dx >= 0 && dy >= 0) {
            x = (endPointX - dx + unitDy * CanvasConfiguration.WEIGHT_OFFSET);
            y = (endPointY - dy - unitDx * CanvasConfiguration.WEIGHT_OFFSET);
        }
        if (dx >= 0 && dy < 0) {
            x = (endPointX - dx - unitDy * CanvasConfiguration.WEIGHT_OFFSET);
            y = (endPointY - dy + unitDx * CanvasConfiguration.WEIGHT_OFFSET);
        }
        if (dx < 0 && dy > 0) {
            x = (endPointX - dx + unitDy * CanvasConfiguration.WEIGHT_OFFSET);
            y = (endPointY - dy - unitDx * CanvasConfiguration.WEIGHT_OFFSET);
        }
        if (dx < 0 && dy <= 0) {
            x = (endPointX - dx - unitDy * CanvasConfiguration.WEIGHT_OFFSET);
            y = (endPointY - dy + unitDx * CanvasConfiguration.WEIGHT_OFFSET);
        }
        return new DOMPoint(x, y);
    }

    moveBy(x: number, y: number): void {
        this.linePoints.forEach(point => {
            point.x = point.x + x;
            point.y = point.y + y;
        });
        this.move(this.start, this.end);
    }

    isEnclosedByRectangle(): boolean {
        this.setSelected(this.start.isSelected() && this.end.isSelected());
        return this.isSelected();
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
