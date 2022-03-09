import {PlaceTransitionArc} from './abstract-arc/place-transition-arc';
import {ArcEnd} from './arc-end/arc-end';
import {EmptyCircleArcEnd} from './arc-end/empty-circle-arc-end';
import {NodeElement} from '../svg-objects/node-element';

export class InhibitorArc extends PlaceTransitionArc {

    public static readonly ID = 'arc_end_circle_empty';

    constructor(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) {
        super(start, end, InhibitorArc.ID, linePoints, multiplicityLabel);
    }

    createArcEnd(): ArcEnd {
        return new EmptyCircleArcEnd();
    }
}