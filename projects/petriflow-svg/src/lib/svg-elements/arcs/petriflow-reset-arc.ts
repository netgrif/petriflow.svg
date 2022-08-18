import {NodeElement, ResetArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowResetArc extends PetriflowArc<ResetArc> {

    constructor(arc: ResetArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowResetArc(new ResetArc(start, end, points, multiplicity));
    }
}
