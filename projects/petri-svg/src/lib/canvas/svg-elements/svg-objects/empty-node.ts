import {NodeElement} from './node-element';
import {CanvasElement} from './canvas-element';

export class EmptyNode extends NodeElement {

    activate(): void {
        super.activate();
    }

    deactivate(): void {
        super.deactivate();
    }

    getEdgeIntersection(): DOMPoint {
        return this.position;
    }

    clone(): CanvasElement | undefined {
        return undefined;
    }
}
