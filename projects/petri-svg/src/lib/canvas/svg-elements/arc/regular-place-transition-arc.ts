import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {ArrowArcEnd} from './arc-end/arrow-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class RegularPlaceTransitionArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_arrow';

    constructor(id: string, start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string | null) {
        super(id, start, end, RegularPlaceTransitionArc.ID, linePoints, multiplicityLabel ?? '');
    }

    createArcEnd(): ArcEnd {
        return new ArrowArcEnd();
    }

    clone(): RegularPlaceTransitionArc | undefined {
        return new RegularPlaceTransitionArc(this.id, this.start, this.end, this.linePoints, this.multiplicity?.textContent);
    }

}
