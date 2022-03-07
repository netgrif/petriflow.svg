import {TransitionPlaceArc} from './abstract-arc/transition-place-arc';
import {ArrowArcEnd} from './arc-end/arrow-arc-end';
import {ArcEnd} from './arc-end/arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class RegularTransitionPlaceArc extends TransitionPlaceArc {

    public static readonly ID = 'arc_end_arrow';

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super(start, end, RegularTransitionPlaceArc.ID, linePoints, multiplicityLabel);
    }

    createArcEnd(): ArcEnd {
        return new ArrowArcEnd();
    }
}
