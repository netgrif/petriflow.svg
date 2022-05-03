import {NodeElement} from 'projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {PetriflowArc} from '../petriflow-arc';
import {RegularTransitionPlaceArc} from '../../../../../canvas/src/lib/canvas/svg-elements/arc/regular-transition-place-arc';
import {RegularPlaceTransitionArc} from '../../../../../canvas/src/lib/canvas/svg-elements/arc/regular-place-transition-arc';

export class PetriflowTransitionPlaceArc extends PetriflowArc<RegularTransitionPlaceArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowTransitionPlaceArc(new RegularPlaceTransitionArc(start, end, points, this._element.multiplicity?.textContent));
    }
}
