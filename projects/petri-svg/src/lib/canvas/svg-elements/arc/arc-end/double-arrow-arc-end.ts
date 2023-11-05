import {CanvasConfiguration} from '../../../canvas-configuration';
import {ArcEnd} from './arc-end';

export class DoubleArrowArcEnd extends ArcEnd {

    public static readonly ID = 'arc_end_double_arrow';

    constructor() {
        super(DoubleArrowArcEnd.ID, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE - 1, CanvasConfiguration.ARROW_HEAD_SIZE / 2);
    }

    public arrow(): SVGMarkerElement {
        const arrow = super.arrow();
        const arrowHeads = this.arrowHead('svg-inactive-fill');
        arrow.appendChild(arrowHeads[0]);
        arrow.appendChild(arrowHeads[1]);
        return arrow;
    }

    public activeArrow(): SVGMarkerElement {
        const arrow = super.activeArrow();
        const arrowHeads = this.arrowHead('svg-active-fill');
        arrow.appendChild(arrowHeads[0]);
        arrow.appendChild(arrowHeads[1]);
        return arrow;
    }

    private arrowHead(cssClass: string): SVGPolygonElement[] {
        const arrowHead = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        arrowHead.setAttributeNS(null, 'points', `0,0 ${CanvasConfiguration.ARROW_HEAD_SIZE},${CanvasConfiguration.ARROW_HEAD_SIZE / 2} 0,${CanvasConfiguration.ARROW_HEAD_SIZE}`);
        arrowHead.setAttributeNS(null, 'class', cssClass);
        const secondArrowHead = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        secondArrowHead.setAttributeNS(null, 'points', `${-CanvasConfiguration.ARROW_HEAD_SIZE + 1},0 1,${CanvasConfiguration.ARROW_HEAD_SIZE / 2} ${-CanvasConfiguration.ARROW_HEAD_SIZE + 1},${CanvasConfiguration.ARROW_HEAD_SIZE}`);
        secondArrowHead.setAttributeNS(null, 'class', cssClass);
        return [arrowHead, secondArrowHead];
    }
}
