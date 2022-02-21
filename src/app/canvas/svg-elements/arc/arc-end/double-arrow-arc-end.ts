import {ArcEnd} from './arc-end';
import {CanvasConfiguration} from "../../../canvas-configuration";

export class DoubleArrowArcEnd extends ArcEnd {

    public static readonly ID = 'arc_end_double_arrow';

    private readonly _arrowHead: SVGPolygonElement;

    constructor() {
        super(DoubleArrowArcEnd.ID, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE - 1, CanvasConfiguration.ARROW_HEAD_SIZE / 2);
        this._arrowHead = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        this._arrowHead.setAttributeNS(null, 'points', `0,0 ${CanvasConfiguration.ARROW_HEAD_SIZE},${CanvasConfiguration.ARROW_HEAD_SIZE / 2} 0,${CanvasConfiguration.ARROW_HEAD_SIZE}`);
        let secondArrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        secondArrow.setAttributeNS(null, 'points', `${-CanvasConfiguration.ARROW_HEAD_SIZE + 1},0 1,${CanvasConfiguration.ARROW_HEAD_SIZE / 2} ${-CanvasConfiguration.ARROW_HEAD_SIZE + 1},${CanvasConfiguration.ARROW_HEAD_SIZE}`);

        this.arrow.appendChild(this._arrowHead);
        this.arrow.appendChild(secondArrow);
    }

    activate(): void {
    }

    deactivate(): void {
    }
}
