import {CanvasConfiguration} from '../../../canvas-configuration';
import {ArcEnd} from './arc-end';

export class ArrowArcEnd extends ArcEnd {

    public static readonly ID = 'arc_end_arrow';

    constructor() {
        super(ArrowArcEnd.ID, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE - 1, CanvasConfiguration.ARROW_HEAD_SIZE / 2);
    }

    public arrow(): SVGMarkerElement {
        const arrow = super.arrow();
        const arrowHead = this.arrowHead('svg-inactive-fill');
        arrow.appendChild(arrowHead);
        return arrow;
    }

    public activeArrow(): SVGMarkerElement {
        const arrow = super.activeArrow();
        const arrowHead = this.arrowHead('svg-active-fill');
        arrow.appendChild(arrowHead);
        return arrow;
    }

    private arrowHead(cssClass: string): SVGPolygonElement {
        const arrowHead = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        arrowHead.setAttributeNS(null, 'points', `0,0 ${CanvasConfiguration.ARROW_HEAD_SIZE},${CanvasConfiguration.ARROW_HEAD_SIZE / 2} 0,${CanvasConfiguration.ARROW_HEAD_SIZE}`);
        arrowHead.setAttributeNS(null, 'class', cssClass);
        return arrowHead;
    }
}
