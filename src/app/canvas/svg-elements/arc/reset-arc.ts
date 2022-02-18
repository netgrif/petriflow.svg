import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {DoubleArrowArcEnd} from './arc-end/double-arrow-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class ResetArc extends PlaceTransitionArc {

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super(start, end, 'arc_end_double_arrow', linePoints, multiplicityLabel);
    }

    createArcEnd(): ArcEnd {
        return new DoubleArrowArcEnd();
    }
}
