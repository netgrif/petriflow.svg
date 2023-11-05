import {NodeElement} from '../svg-objects/node-element';
import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';

export class RegularPlaceTransitionArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_arrow';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, RegularPlaceTransitionArc.ID, linePoints, multiplicityLabel ?? '');
    }

    clone(): RegularPlaceTransitionArc | undefined {
        return new RegularPlaceTransitionArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }

}
