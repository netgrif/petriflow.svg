import {NodeElement} from 'projects/petri-svg/src/lib/canvas/svg-elements/svg-objects/node-element';
import {PetriflowArc} from '../petriflow-arc';
import {RegularPlaceTransitionArc} from '../../../../../petri-svg/src/lib/canvas/svg-elements/arc/regular-place-transition-arc';

export class PetriflowPlaceTransitionArc extends PetriflowArc<RegularPlaceTransitionArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowPlaceTransitionArc(new RegularPlaceTransitionArc(start, end, points, this._element.multiplicity?.textContent));
    }
}
