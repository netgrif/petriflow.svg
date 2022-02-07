import {CanvasElement} from './canvas-element';

export abstract class NodeElement extends CanvasElement {

    private _position: DOMPoint;

    constructor(position: DOMPoint) {
        super();
        this._position = position;
    }

    move(position: DOMPoint) {
        this._position = position;
    }

    /**
     * Calculates point on the edge of this element where a straight line leading from given point to the center
     * (position) of this element intersects with the edge of this element.
     *
     * Use this function to calculate ending point for arcs where the arrow should be rendered.
     *
     * @param from start of the line
     */
    public abstract getEdgeIntersection(from: DOMPoint): DOMPoint;

    get position(): DOMPoint {
        return this._position;
    }
}
