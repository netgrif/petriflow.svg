import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {NodeElement} from 'projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {SelectableArc} from '../selectable-arc';
import {RegularPlaceTransitionArc} from '../../../../../canvas/src/lib/canvas/svg-elements/arc/regular-place-transition-arc';

export class PetriflowPlaceTransitionArc extends RegularPlaceTransitionArc implements SelectableArc {
    clone(): Arc {
        const copyObject: Arc = Object.assign(Object.create(this), this) as Arc;
        copyObject.container = this.container.cloneNode(true) as SVGGElement;
        return copyObject;
    }

    deselect(): void {
    }

    getContainer(): SVGGElement {
        return undefined;
    }

    getDestination(): NodeElement {
        return undefined;
    }

    getSource(): NodeElement {
        return undefined;
    }

    moveBy(x: number, y: number): void {
    }

    select(): void {
    }

}
