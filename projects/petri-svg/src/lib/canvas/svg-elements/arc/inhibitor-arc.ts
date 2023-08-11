import {PlaceTransitionArc} from './abstract-arc';
import {NodeElement} from '../svg-objects';

export class InhibitorArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_circle_empty';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, InhibitorArc.ID, linePoints, multiplicityLabel ?? '');
    }

    clone(): InhibitorArc | undefined {
        return new InhibitorArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }
}
