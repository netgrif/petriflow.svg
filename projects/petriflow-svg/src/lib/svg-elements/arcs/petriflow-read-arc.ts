import {NodeElement, ReadArc} from '@netgrif/petri.svg';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowReadArc extends PetriflowArc<ReadArc> {

    constructor(arc: ReadArc) {
        super(arc);
    }

    public static of(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null): PetriflowReadArc {
        return new PetriflowReadArc(new ReadArc(id, start, end, linePoints, multiplicityLabel));
    }

    createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowReadArc(new ReadArc(id, start, end, points, multiplicity));
    }
}
