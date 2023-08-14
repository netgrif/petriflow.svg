import {CanvasConfiguration} from '../../canvas-configuration';
import {LabeledObject} from '../svg-objects/labeled-object';

export class Place extends LabeledObject {
    private static readonly TOKEN_OFFSETS = [[0, 0], [1, 1], [-1, 1], [1, -1], [-1, -1], [-1, 0], [1, 0], [0, -1], [0, 1]];
    private static readonly TOKEN_LAYOUTS = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    private _markingTokens: Array<SVGCircleElement>;
    private _markingElement: SVGTextElement;
    private _marking: Text;
    private _tokensCount: number;

    constructor(id: string, label: string, marking: number, position: DOMPoint) {
        super(id, label, position);
        this.element = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'circle') as SVGCircleElement;
        this.element.id = `svg_place_${id}`;
        this.element.setAttributeNS(null, 'r', `${CanvasConfiguration.RADIUS}`);
        this.element.setAttributeNS(null, 'stroke-width', '2');
        this.element.setAttributeNS(null, 'fill', 'white');
        this.container.appendChild(this.element);
        this._tokensCount = marking;

        this._markingTokens = [];
        for (let i = 0; i < 9; i++) {
            this._markingTokens[i] = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'circle') as SVGCircleElement;
            this._markingTokens[i].setAttributeNS(null, 'r', (CanvasConfiguration.TOKEN_RADIUS).toString());
            this.container.appendChild(this._markingTokens[i]);
        }

        this._markingElement = (document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'text') as unknown) as SVGTextElement;
        this._markingElement.setAttributeNS(null, 'font-size', `${CanvasConfiguration.FONT.SIZE}`);
        this._markingElement.setAttributeNS(null, 'font-family', CanvasConfiguration.FONT.FAMILY);
        this._markingElement.setAttributeNS(null, 'text-anchor', 'middle');
        this._markingElement.setAttributeNS(null, 'dominant-baseline', 'middle');
        this._marking = document.createTextNode('');
        this._markingElement.appendChild(this._marking);
        this.container.appendChild(this._markingElement);
        this.updateMarking(marking);

        this.move(position);
        this.deactivate();
    }

    public getElements(): Array<SVGElement> {
        const elements = super.getElements();
        elements.push(this.markingElement);
        this.markingTokens.forEach(m => elements.push(m));
        return elements;
    }

    markingToString(marking: number): string {
        if (this.tokensVisible(marking)) {
            return '';
        } else {
            return `${marking}`;
        }
    }

    tokensVisible(marking: number) {
        return marking >= 0 && marking <= 9;
    }

    activate(): void {
        super.activate();
        this.element.setAttributeNS(null, 'class', 'svg-active-stroke');

        if (this.tokensVisible(this.tokensCount)) {
            for (let i = 0; i < 9; i++) {
                if (Place.TOKEN_LAYOUTS[this.tokensCount][i] === 1) {
                    this._markingTokens[i].setAttributeNS(null, 'class', 'svg-active-fill');
                } else {
                    this._markingTokens[i].setAttributeNS(null, 'class', 'svg-invisible-fill');
                }
            }
        }
    }

    deactivate(): void {
        super.deactivate();
        this.element.setAttributeNS(null, 'stroke', 'black');
        this.element.setAttributeNS(null, 'class', 'svg-inactive-stroke');

        if (this.tokensVisible(this.tokensCount)) {
            for (let i = 0; i < 9; i++) {
                if (Place.TOKEN_LAYOUTS[this.tokensCount][i] === 1) {
                    this._markingTokens[i].setAttributeNS(null, 'class', 'svg-inactive-fill');
                } else {
                    this._markingTokens[i].setAttributeNS(null, 'class', 'svg-invisible-fill');
                }
            }
        }
    }

    move(position: DOMPoint): void {
        super.move(position);
        this.setElementPosition(position);
        for (let i = 0; i < 9; i++) {
            this.setMarkingTokenPosition(i, position);
        }
    }

    /**
     * Calculates intersection using the [Circle-Line Intersection](https://mathworld.wolfram.com/Circle-LineIntersection.html)
     * formula. Putting the circle center to position [0, 0] we can simplify the formula:
     * ```
     * x1 = from.x
     * y1 = from.y
     * x2 = 0
     * y2 = 0
     *
     * dx = x2 - x1 = 0 - x1 = -x1
     * dy = y2 - y1 = 0 - y1 = -y1
     * dr = sqrt(dx^2 + dy^2)
     * D = x1*y2 - x2*y1 = x1*0 - 0*y1 = 0
     *
     * x = (D*dy +- sgn(dy)*dx*sqrt(r^2 * dr^2 - D^2)) / dr^2 = (0*dy +- sgn(dy)*dx*sqrt(r^2 * dr^2 - 0^2)) / dr^2 = +-sgn(dy)*dx*sqrt(r^2 * dr^2) / dr^2
     * y = (-D*dx +- abs(dy)*sqrt(r^2 * dr^2 - D^2)) / dr^2 = (-0*dx +- abs(dy)*sqrt(r^2 * dr^2 - 0^2)) / dr^2 = +-abs(dy)*sqrt(r^2 * dr^2) / dr^2
     * ```
     *
     * After that use {@link getIntersectionCoordinate} to determine the correct coordinates.
     */
    getEdgeIntersection(from: DOMPoint, offset: number): DOMPoint {
        const offsetFrom = new DOMPoint(from.x - this.position.x, from.y - this.position.y);
        const r = CanvasConfiguration.RADIUS + offset;
        const dx = 0 - offsetFrom.x;
        const dy = 0 - offsetFrom.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        const x1 = (+this.sgn(dy) * dx * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const x2 = (-this.sgn(dy) * dx * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const y1 = (+Math.abs(dy) * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const y2 = (-Math.abs(dy) * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const point = new DOMPoint();
        point.x = this.getIntersectionCoordinate(this.position.x, x1, x2, offsetFrom.x);
        point.y = this.getIntersectionCoordinate(this.position.y, y1, y2, offsetFrom.y);
        return point;
    }

    getIntersectionCoordinate(placeCoordinate: number, firstCoordinate: number, secondCoordinate: number, offset: number): number {
        if (offset < 0) {
            if (firstCoordinate < 0) {
                return firstCoordinate + placeCoordinate;
            } else {
                return secondCoordinate + placeCoordinate;
            }
        } else {
            if (firstCoordinate > 0) {
                return firstCoordinate + placeCoordinate;
            } else {
                return secondCoordinate + placeCoordinate;
            }
        }
    }

    private sgn(n: number): number {
        if (n < 0) {
            return -1;
        } else {
            return 1;
        }
    }

    private setElementPosition(position: DOMPoint) {
        this.element.setAttributeNS(null, 'cx', `${position.x}`);
        this.element.setAttributeNS(null, 'cy', `${position.y}`);
        this._markingElement.setAttributeNS(null, 'x', `${position.x}`);
        this._markingElement.setAttributeNS(null, 'y', `${position.y}`);
    }

    private setMarkingTokenPosition(i: number, position: DOMPoint) {
        const offset = Place.TOKEN_OFFSETS[i];
        this._markingTokens[i].setAttributeNS(null, 'cx', (position.x + offset[0] * CanvasConfiguration.TOKEN_OFFSET).toString());
        this._markingTokens[i].setAttributeNS(null, 'cy', (position.y + offset[1] * CanvasConfiguration.TOKEN_OFFSET).toString());
    }

    updateMarking(marking: number) {
        this._marking.nodeValue = this.markingToString(marking);
        this.tokensCount = marking;
        for (let i = 0; i < 9; i++) {
            let fill;
            if (this.tokensVisible(marking) && Place.TOKEN_LAYOUTS[marking][i] === 1) {
                fill = this.isActive() ? 'svg-active-fill' : 'svg-inactive-fill';
            } else {
                fill = 'svg-invisible-fill';
            }
            this._markingTokens[i].setAttributeNS(null, 'class', fill);
        }
        // TODO: setMarkingTokenPosition?
    }

    get markingTokens(): Array<SVGCircleElement> {
        return this._markingTokens;
    }

    set markingTokens(value: Array<SVGCircleElement>) {
        this._markingTokens = value;
    }

    get markingElement(): SVGTextElement {
        return this._markingElement;
    }

    set markingElement(value: SVGTextElement) {
        this._markingElement = value;
    }

    get marking(): Text {
        return this._marking;
    }

    set marking(value: Text) {
        this._marking = value;
    }

    get tokensCount(): number {
        return this._tokensCount;
    }

    set tokensCount(value: number) {
        this._tokensCount = value;
    }

    clone(): Place | undefined {
        return new Place(this.id, this.label.data, this.tokensCount, this.position);
    }
}
