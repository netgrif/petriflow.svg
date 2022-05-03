import {NodeElement} from 'projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {PetriflowArc} from '../petriflow-arc';
import {ReadArc} from '../../../../../canvas/src/lib/canvas/svg-elements/arc/read-arc';

export class PetriflowReadArc extends PetriflowArc<ReadArc> {

    constructor(arc: ReadArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowReadArc(new ReadArc(start, end, points, this._element.multiplicity?.textContent));
    }
}
