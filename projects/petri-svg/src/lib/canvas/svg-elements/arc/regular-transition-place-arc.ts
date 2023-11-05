import {NodeElement} from '../svg-objects';
import {TransitionPlaceArc} from './abstract-arc';

export class RegularTransitionPlaceArc extends TransitionPlaceArc {

    public static readonly ID = 'arc_end_arrow';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, RegularTransitionPlaceArc.ID, linePoints, multiplicityLabel ?? '');
    }

    clone(): RegularTransitionPlaceArc | undefined {
        return new RegularTransitionPlaceArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
