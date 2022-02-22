import {CanvasElement} from './canvas-element';
import {Arc} from '../arc/abstract-arc/arc';

export abstract class NodeElement extends CanvasElement {

    private _position: DOMPoint;
    private _arcs: Array<Arc>;

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
}
