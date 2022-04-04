import {PetriflowCanvasElement} from './PetriflowCanvasElement';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import { Arc } from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';

export abstract class PetriflowNodeElement<T extends NodeElement> extends PetriflowCanvasElement<NodeElement> {

    protected constructor(element: T) {
        super(element);
    }

    getPosition(): DOMPoint {
        return this.element.position;
    }

    move(position: DOMPoint): void {
        this.element.move(position);
    }

    moveBy(x: number, y: number) {
        const moveTo = new DOMPoint(this.element.position.x + x, this.element.position.y + y);
        this.move(moveTo);
    }

    abstract changeId(id: string);

    deleteArcs(arcs: Array<Arc>) {
        arcs.forEach(arc => {
            const index = this.element.arcs.indexOf(arc);
            if (index !== -1) {
                this.element.arcs.splice(index, 1);
            }
        });
    }
}
