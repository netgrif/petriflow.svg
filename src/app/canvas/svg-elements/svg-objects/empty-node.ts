import {NodeElement} from './node-element';

export class EmptyNode extends NodeElement {

    activate(): void {
    }

    deactivate(): void {
    }

    getEdgeIntersection(from: DOMPoint): DOMPoint {
        return this.position;
    }
}
