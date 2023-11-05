import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {NodeElement} from '../svg-objects/node-element';

export class ReadArc extends PlaceTransitionArc {

    public static readonly ID = 'read_arc_end';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, ReadArc.ID, linePoints, multiplicityLabel ?? '');
    }

    clone(): ReadArc | undefined {
        return new ReadArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
