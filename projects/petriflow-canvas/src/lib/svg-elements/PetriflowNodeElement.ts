import {PetriflowCanvasElement} from './PetriflowCanvasElement';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

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
}
