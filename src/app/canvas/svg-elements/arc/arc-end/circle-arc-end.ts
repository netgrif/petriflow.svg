import {ArcEnd} from './arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export abstract class CircleArcEnd extends ArcEnd {

    private readonly _circle: SVGCircleElement;

    protected constructor(id: string) {
        super(id, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE / 2, 0);

        this._circle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'circle') as SVGCircleElement;
        this._circle.setAttributeNS(null, 'r', `${CanvasConfiguration.ARROW_HEAD_SIZE / 2}`);
        this._circle.setAttributeNS(null, 'stroke-width', '2');
        this.arrow.appendChild(this._circle);
    }

    get circle(): SVGCircleElement {
        return this._circle;
    }
}
