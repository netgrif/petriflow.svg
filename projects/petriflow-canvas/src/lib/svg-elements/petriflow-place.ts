import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {SelectableNode} from './selectable-node';

export class PetriflowPlace extends Place implements SelectableNode<PetriflowPlace> {

    deselect(): void {
        this.deactivate();
    }

    getPosition(): DOMPoint {
        return this.position;
    }

    select(): void {
        this.activate();
    }

    clone(): PetriflowPlace {
        const copyObject: PetriflowPlace = Object.assign(Object.create(this), this) as PetriflowPlace;
        copyObject.container = this.container.cloneNode(true) as SVGGElement;
        return copyObject;
    }

    getContainer(): SVGGElement {
        return this.container;
    }
}
