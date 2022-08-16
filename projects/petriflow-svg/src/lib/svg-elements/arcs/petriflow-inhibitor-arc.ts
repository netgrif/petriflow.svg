import {NodeElement} from 'projects/petri-svg/src/lib/canvas/svg-elements/svg-objects/node-element';
import {InhibitorArc} from '../../../../../petri-svg/src/lib/canvas/svg-elements/arc/inhibitor-arc';
import {PetriflowArc} from '../petriflow-arc';

export class PetriflowInhibitorArc extends PetriflowArc<InhibitorArc> {

    constructor(arc: InhibitorArc) {
        super(arc);
    }

    createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string) {
        return new PetriflowInhibitorArc(new InhibitorArc(start, end, points, this._element.multiplicity?.textContent));
    }
}
