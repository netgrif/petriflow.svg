import {StaticPlace} from '../../../../canvas/src/lib/canvas/svg-elements/place/static-place';
import {SelectableNode} from './selectable-node';

export class PetriflowStaticPlace extends StaticPlace implements SelectableNode<StaticPlace> {
    deselect(): void {
        this.deactivate();
    }

    getPosition(): DOMPoint {
        return this.position;
    }

    select(): void {
        this.activate();
    }

    clone(): PetriflowStaticPlace {
        const copyObject: PetriflowStaticPlace = Object.assign(Object.create(this), this) as PetriflowStaticPlace;
        copyObject.container = this.container.cloneNode(true) as SVGGElement;
        return copyObject;
    }

    getContainer(): SVGGElement {
        return this.container;
    }
}
