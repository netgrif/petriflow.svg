import {PetriflowCanvasElement} from './PetriflowCanvasElement';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

export abstract class PetriflowNodeElement extends PetriflowCanvasElement<NodeElement> {

    getPosition(): DOMPoint {
        return this.element.position;
    }

    move(position: DOMPoint): void {
        this.element.move(position);
    }
}
