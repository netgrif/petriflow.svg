import {NodeElement, RegularPlaceTransitionArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowPlaceTransitionArc extends PetriflowArc<RegularPlaceTransitionArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowPlaceTransitionArc(new RegularPlaceTransitionArc(id, start, end, points, multiplicity));
    }
}
