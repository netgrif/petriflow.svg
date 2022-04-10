import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {SelectableNode} from './selectable-node';

export class PetriflowTransition extends Transition implements SelectableNode<PetriflowTransition> {

    deselect(): void {
        this.deactivate();
    }

    getPosition(): DOMPoint {
        return this.position;
    }

    select(): void {
        this.activate();
    }

    clone(): PetriflowTransition {
        const copyObject: PetriflowTransition = Object.assign(Object.create(this), this) as PetriflowTransition;
        copyObject.container = this.container.cloneNode(true) as SVGGElement;
        return copyObject;
    }

    getContainer(): SVGGElement {
        return this.container;
    }
}
