import {TransitionPlaceArc} from './abstract-arc';
import {ArcEnd, ArrowArcEnd} from './arc-end';
import {NodeElement} from '../svg-objects';

export class RegularTransitionPlaceArc extends TransitionPlaceArc {

    public static readonly ID = 'arc_end_arrow';

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(start, end, RegularTransitionPlaceArc.ID, linePoints, multiplicityLabel ?? '');
    }

    createArcEnd(): ArcEnd {
        return new ArrowArcEnd();
    }

    clone(): RegularTransitionPlaceArc | undefined {
        return new RegularTransitionPlaceArc(this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
