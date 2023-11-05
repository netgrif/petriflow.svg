import {CircleArcEnd} from './circle-arc-end';

export class EmptyCircleArcEnd extends CircleArcEnd {

    public static readonly ID = 'arc_end_circle_empty';

    constructor() {
        super(EmptyCircleArcEnd.ID);
    }

    public arrow(): SVGMarkerElement {
        const arrow = super.arrow();
        const arrowHead = this.getCircle('svg-inactive-stroke');
        arrowHead.setAttributeNS(null, 'fill', 'white');
        arrow.appendChild(arrowHead);
        return arrow;
    }

    public activeArrow(): SVGMarkerElement {
        const arrow = super.activeArrow();
        const arrowHead = this.getCircle('svg-active-stroke');
        arrowHead.setAttributeNS(null, 'fill', 'white');
        arrow.appendChild(arrowHead);
        return arrow;
    }
}
