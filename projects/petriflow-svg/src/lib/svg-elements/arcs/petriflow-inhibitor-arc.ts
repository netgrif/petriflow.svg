import {InhibitorArc, NodeElement} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowInhibitorArc extends PetriflowArc<InhibitorArc> {

    constructor(arc: InhibitorArc) {
        super(arc);
    }

    public static of(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null): PetriflowInhibitorArc {
        return new PetriflowInhibitorArc(new InhibitorArc(id, start, end, linePoints, multiplicityLabel));
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowInhibitorArc(new InhibitorArc(id, start, end, points, multiplicity));
    }
}
