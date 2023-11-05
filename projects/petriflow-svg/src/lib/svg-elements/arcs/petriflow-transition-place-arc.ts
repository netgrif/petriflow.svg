import {NodeElement, RegularPlaceTransitionArc, RegularTransitionPlaceArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowTransitionPlaceArc extends PetriflowArc<RegularTransitionPlaceArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    public static of(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null): PetriflowTransitionPlaceArc {
        return new PetriflowTransitionPlaceArc(new RegularTransitionPlaceArc(id, start, end, linePoints, multiplicityLabel));
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowTransitionPlaceArc(new RegularTransitionPlaceArc(id, start, end, points, multiplicity));
    }
}
