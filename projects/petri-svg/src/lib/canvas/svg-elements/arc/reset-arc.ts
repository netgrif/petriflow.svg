import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {DoubleArrowArcEnd} from './arc-end/double-arrow-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class ResetArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_double_arrow';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, ResetArc.ID, linePoints, multiplicityLabel ?? '');
    }

    createArcEnd(): ArcEnd {
        return new DoubleArrowArcEnd();
    }

    clone(): ResetArc | undefined {
        return new ResetArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
