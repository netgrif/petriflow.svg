import {NodeElement} from '../svg-objects/node-element';
import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';

export class ResetArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_double_arrow';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, ResetArc.ID, linePoints, multiplicityLabel ?? '');
    }

    clone(): ResetArc | undefined {
        return new ResetArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
