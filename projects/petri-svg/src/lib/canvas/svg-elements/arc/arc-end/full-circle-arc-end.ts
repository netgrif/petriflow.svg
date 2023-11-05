import {CircleArcEnd} from './circle-arc-end';

export class FullCircleArcEnd extends CircleArcEnd {

    public static readonly ID = 'read_arc_end';

    constructor() {
        super(FullCircleArcEnd.ID);
    }

    public arrow(): SVGMarkerElement {
        const arrow = super.arrow();
        const arrowHead = this.getCircle('svg-inactive-fill svg-inactive-stroke');
        arrow.appendChild(arrowHead);
        return arrow;
    }

    public activeArrow(): SVGMarkerElement {
        const arrow = super.activeArrow();
        const arrowHead = this.getCircle('svg-active-fill svg-active-stroke');
        arrow.appendChild(arrowHead);
        return arrow;
    }
}
