import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {FullCircleArcEnd} from './arc-end/full-circle-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class ReadArc extends PlaceTransitionArc {

    public static readonly ID = 'read_arc_end';

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super(start, end, ReadArc.ID, linePoints, multiplicityLabel);
    }

    createArcEnd(): ArcEnd {
        return new FullCircleArcEnd();
    }

    clone(): ReadArc {
        return new ReadArc(this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
