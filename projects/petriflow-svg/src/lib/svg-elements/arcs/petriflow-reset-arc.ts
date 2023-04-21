import {NodeElement, ResetArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowResetArc extends PetriflowArc<ResetArc> {

    constructor(arc: ResetArc) {
        super(arc);
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowResetArc(new ResetArc(id, start, end, points, multiplicity));
    }
}
