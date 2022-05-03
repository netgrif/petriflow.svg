import {NodeElement} from 'projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {PetriflowArc} from '../petriflow-arc';
import {ResetArc} from '../../../../../canvas/src/lib/canvas/svg-elements/arc/reset-arc';

export class PetriflowResetArc extends PetriflowArc<ResetArc> {

    constructor(arc: ResetArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowResetArc(new ResetArc(start, end, points, this._element.multiplicity?.textContent));
    }
}
