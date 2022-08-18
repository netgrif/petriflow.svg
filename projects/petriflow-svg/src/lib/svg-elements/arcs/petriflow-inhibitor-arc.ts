import {InhibitorArc, NodeElement} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowInhibitorArc extends PetriflowArc<InhibitorArc> {

    constructor(arc: InhibitorArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowInhibitorArc(new InhibitorArc(start, end, points, multiplicity));
    }
}
