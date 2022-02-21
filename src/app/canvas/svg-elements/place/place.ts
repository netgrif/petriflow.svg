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
    private _element: SVGCircleElement;
    private _markingElement: SVGTextElement;
    private _marking: Text;

    constructor(id: string, label: string, marking: number, position: DOMPoint) {
        super(label, position);
        this._element = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'circle') as SVGCircleElement;
        this._element.id = `svg_place_${id}`;
        this._element.setAttributeNS(null, 'r', `${CanvasConfiguration.RADIUS}`);
        this._element.setAttributeNS(null, 'stroke-width', '2');
        this._element.setAttributeNS(null, 'fill', 'white');
        this.container.appendChild(this._element);

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
        this._element.setAttributeNS(null, 'stroke', 'blue');
    }

    deactivate(): void {
        super.deactivate();
        this._element.setAttributeNS(null, 'stroke', 'black');
    }

    move(position: DOMPoint): void {
        super.move(position);
        this.setElementPosition(position);
        for (let i = 0; i < 9; i++) {
            this.setMarkingTokenPosition(i, position);
        }
    }

    /**
     * Source: https://mathworld.wolfram.com/Circle-LineIntersection.html
     */
    getEdgeIntersection(from: DOMPoint): DOMPoint {
        const offsetFrom = new DOMPoint(from.x - this.position.x, from.y - this.position.y);
        const r = CanvasConfiguration.RADIUS + 1;
        const dx = 0 - offsetFrom.x;
        const dy = 0 - offsetFrom.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        const x1 = (+this.sgn(dy) * dx * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const x2 = (-this.sgn(dy) * dx * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const y1 = (+Math.abs(dy) * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        const y2 = (-Math.abs(dy) * Math.sqrt(r * r * dr * dr)) / (dr * dr);
        let point = new DOMPoint();
        point.x = this.getIntersectionCoordinate(this.position.x, x1, x2, offsetFrom.x);
        point.y = this.getIntersectionCoordinate(this.position.y, y1, y2, offsetFrom.y);
        return point;
    }

    private getIntersectionCoordinate(placeCoordinate: number, firstCoordinate: number, secondCoordinate: number, offset: number): number {
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
        this._element.setAttributeNS(null, 'cx', `${position.x}`);
        this._element.setAttributeNS(null, 'cy', `${position.y}`);
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
        for (let i = 0; i < 9; i++) {
            let fill;
            if (this.tokensVisible(marking)) {
                fill = Place.TOKEN_LAYOUTS[marking][i] === 1 ? 'black' : 'white';
            } else {
                fill = 'white';
            }
            this._markingTokens[i].setAttributeNS(null, 'fill', fill);
        }
        // TODO: setMarkingTokenPosition?
    }

    get markingTokens(): Array<SVGCircleElement> {
        return this._markingTokens;
    }

    set markingTokens(value: Array<SVGCircleElement>) {
        this._markingTokens = value;
    }

    get element(): any {
        return this._element;
    }

    set element(value: any) {
        this._element = value;
    }

    get markingElement(): any {
        return this._markingElement;
    }

    set markingElement(value: any) {
        this._markingElement = value;
    }

    get marking(): any {
        return this._marking;
    }

    set marking(value: any) {
        this._marking = value;
    }
}
