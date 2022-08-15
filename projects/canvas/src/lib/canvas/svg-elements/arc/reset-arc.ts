import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {DoubleArrowArcEnd} from './arc-end/double-arrow-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class ResetArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_double_arrow';

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super(start, end, ResetArc.ID, linePoints, multiplicityLabel);
    }

    createArcEnd(): ArcEnd {
        return new DoubleArrowArcEnd();
    }

    clone(): ResetArc {
        return new ResetArc(this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
