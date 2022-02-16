import {ArcEnd} from './arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export class ArrowArcEnd extends ArcEnd {

    public static readonly ID = 'arc_end_arrow';

    private readonly _arrowHead: SVGPolygonElement;

    constructor() {
        super(ArrowArcEnd.ID, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE / 2, CanvasConfiguration.ARROW_HEAD_SIZE);
        this._arrowHead = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        this._arrowHead.setAttributeNS(null, 'points', `0 0, ${CanvasConfiguration.ARROW_HEAD_SIZE / 2} ${CanvasConfiguration.ARROW_HEAD_SIZE}, ${CanvasConfiguration.ARROW_HEAD_SIZE} 0`);
    }

    activate() {
        this.arrow.setAttributeNS(null, 'class', 'svg-active-fill svg-active-stroke');
    }

    deactivate() {
        this.arrow.setAttributeNS(null, 'class', 'svg-inactive-fill svg-inactive-stroke');
    }
}
