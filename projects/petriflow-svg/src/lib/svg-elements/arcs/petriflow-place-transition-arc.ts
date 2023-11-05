import {NodeElement, RegularPlaceTransitionArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowPlaceTransitionArc extends PetriflowArc<RegularPlaceTransitionArc> {

    constructor(arc: RegularPlaceTransitionArc) {
        super(arc);
    }

    public static of(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null): PetriflowPlaceTransitionArc {
        return new PetriflowPlaceTransitionArc(new RegularPlaceTransitionArc(id, start, end, linePoints, multiplicityLabel));
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowPlaceTransitionArc(new RegularPlaceTransitionArc(id, start, end, points, multiplicity));
    }
}
