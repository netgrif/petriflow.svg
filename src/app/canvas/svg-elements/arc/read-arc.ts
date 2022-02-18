import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {FullCircleArcEnd} from './arc-end/full-circle-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class ReadArc extends PlaceTransitionArc {

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super(start, end, 'read_arc_end', linePoints, multiplicityLabel);
    }

    createArcEnd(): ArcEnd {
        return new FullCircleArcEnd();
    }
}
