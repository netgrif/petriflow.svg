import {CanvasElement} from './canvas-element';
import {Arc} from '../arc/abstract-arc/arc';

export abstract class NodeElement extends CanvasElement {

    private _position: DOMPoint;
    private _arcs: Array<Arc>;
    private _isSelected: boolean;

    constructor(position: DOMPoint) {
        super();
        this._arcs = [];
        this._position = position;
    }

    move(position: DOMPoint) {
        this._position = position;
        this.arcs.forEach(arc => {
            arc.move(arc.start, arc.end);
        });
    }

    deleteArcs(arcs: Array<Arc>) {
        arcs.forEach(arc => {
            const index = this.arcs.indexOf(arc);
            if (index !== -1) {
                this.arcs.splice(index, 1);
            }
        });
    }

    moveBy(x: number, y: number) {
        const moveTo = new DOMPoint(this.position.x + x, this.position.y + y);
        this.move(moveTo);
    }

    /**
     * Calculates point on the edge of this element where a straight line leading from given point to the center
     * (position) of this element intersects with the edge of this element.
     *
     * Use this function to calculate ending point for arcs where the arrow should be rendered.
     *
     * @param from start of the line
     * @param offset intersection by offset
     */
    public abstract getEdgeIntersection(from: DOMPoint, offset: number): DOMPoint;

    get position(): DOMPoint {
        return this._position;
    }

    get arcs(): Array<Arc> {
        return this._arcs;
    }

    set arcs(value: Array<Arc>) {
        this._arcs = value;
    }

    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        this.isSelected = super.isEnclosedByRectangle(rectangle);
        return this._isSelected;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }
}
