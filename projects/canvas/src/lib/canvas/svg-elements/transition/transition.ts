import {CanvasConfiguration} from '../../canvas-configuration';
import {LabeledObject} from '../svg-objects/labeled-object';
import {CanvasElement} from '../svg-objects/canvas-element';

export class Transition extends LabeledObject {

    private _element: SVGRectElement;

    constructor(id: string, label: string, position: DOMPoint) {
        super(id, label, position);
        this._element = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGRectElement;
        this._element.id = `svg_transition_${id}`;
        this._element.setAttributeNS(null, 'width', `${CanvasConfiguration.SIZE}`);
        this._element.setAttributeNS(null, 'height', `${CanvasConfiguration.SIZE}`);
        this._element.setAttributeNS(null, 'stroke', 'black');
        this._element.setAttributeNS(null, 'stroke-width', '1');
        this.container.appendChild(this._element);
    }

    move(position: DOMPoint) {
        super.move(position);
        this.setElementPosition(position);
    }

    activate(): void {
        super.activate();
        this._element.setAttributeNS(null, 'class', 'svg-active-stroke');
    }

    deactivate(): void {
        super.deactivate();
        this._element.setAttributeNS(null, 'class', 'svg-inactive-stroke');
        this._element.setAttributeNS(null, 'fill', 'white');
        this._element.setAttributeNS(null, 'stroke-width', '2');
    }

    /**
     * Calculates intersection of the rectangle using trigonometric functions (tan).
     */
    getEdgeIntersection(from: DOMPoint, offset: number): DOMPoint {
        const offsetFrom = new DOMPoint(from.x - this.position.x, from.y - this.position.y);
        const squareHalfSiteLength = CanvasConfiguration.SIZE / 2 + offset;

        let tanTheta = Infinity;
        if (offsetFrom.x !== 0) {
            tanTheta = Math.abs(offsetFrom.y / offsetFrom.x);
        }
        const quadrantX = Math.sign(offsetFrom.x);
        const quadrantY = Math.sign(offsetFrom.y);

        if (tanTheta > 1) {
            return new DOMPoint(this.position.x + (squareHalfSiteLength / tanTheta) * quadrantX, this.position.y + squareHalfSiteLength * quadrantY);
        } else {
            return new DOMPoint(this.position.x + squareHalfSiteLength * quadrantX, this.position.y + squareHalfSiteLength * tanTheta * quadrantY);
        }
    }

    private setElementPosition(position: DOMPoint) {
        this._element.setAttributeNS(null, 'x', `${position.x - CanvasConfiguration.SIZE / 2}`);
        this._element.setAttributeNS(null, 'y', `${position.y - CanvasConfiguration.SIZE / 2}`);
    }

    setEnabled(firing: boolean) {
        if (firing) {
            this._element.setAttributeNS(null, 'class', 'svg-transition-firing');
        } else {
            this._element.setAttributeNS(null, 'class', 'svg-transition-enabled');
        }
    }

    setDisabled(firing: boolean) {
        this._element.setAttributeNS(null, 'class', 'svg-transition-disabled');
    }

    cancelArrowPoints(position: DOMPoint): string {
        return this.arrowPoints(position, -1);
    }

    finishArrowPoints(position: DOMPoint): string {
        return this.arrowPoints(position, 1);
    }

    /**
     * Create triangular arrow points used as cancel or finish button on transition
     * @param position position of transition
     * @param orientation 1 if the arrow should point to right (finish), -1 if it should point left (cancel)
     */
    arrowPoints(position: DOMPoint, orientation: number): string {
        const x1 = position.x + (0.1 * CanvasConfiguration.SIZE / 2) * orientation;
        const y1 = position.y - 0.8 * CanvasConfiguration.SIZE / 2;
        const x2 = position.x + (0.1 * CanvasConfiguration.SIZE / 2) * orientation;
        const y2 = position.y + 0.8 * CanvasConfiguration.SIZE / 2;
        const x3 = position.x + (0.85 * CanvasConfiguration.SIZE / 2) * orientation;
        return CanvasElement.pointsToString(new DOMPoint(x1, y1), new DOMPoint(x2, y2), new DOMPoint(x3, position.y));
    }

    get element(): SVGRectElement {
        return this._element;
    }

    set element(value: SVGRectElement) {
        this._element = value;
    }

    clone(): Transition {
        return new Transition(this.id, this.label?.textContent, this.position);
    }
}
