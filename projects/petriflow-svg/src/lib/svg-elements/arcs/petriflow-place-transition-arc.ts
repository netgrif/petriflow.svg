import {NodeElement, RegularPlaceTransitionArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowPlaceTransitionArc extends PetriflowArc<RegularPlaceTransitionArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowPlaceTransitionArc(new RegularPlaceTransitionArc(start, end, points, multiplicity));
    }
}
