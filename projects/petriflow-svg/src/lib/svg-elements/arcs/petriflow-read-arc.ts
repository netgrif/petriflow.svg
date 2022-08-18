import {NodeElement, ReadArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowReadArc extends PetriflowArc<ReadArc> {

    constructor(arc: ReadArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowReadArc(new ReadArc(start, end, points, multiplicity));
    }
}
