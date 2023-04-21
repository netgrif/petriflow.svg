import {NodeElement, RegularPlaceTransitionArc, RegularTransitionPlaceArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowTransitionPlaceArc extends PetriflowArc<RegularTransitionPlaceArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowTransitionPlaceArc(new RegularPlaceTransitionArc(id, start, end, points, multiplicity));
    }
}
