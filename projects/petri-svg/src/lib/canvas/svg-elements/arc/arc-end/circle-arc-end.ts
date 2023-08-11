import {ArcEnd} from './arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export abstract class CircleArcEnd extends ArcEnd {

    protected constructor(id: string) {
        super(id, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE, CanvasConfiguration.ARROW_HEAD_SIZE / 2, 0);
    }

    public getCircle(cssClass: string): SVGCircleElement {
        const circle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'circle') as SVGCircleElement;
        circle.setAttributeNS(null, 'r', `${CanvasConfiguration.ARROW_HEAD_SIZE / 2}`);
        circle.setAttributeNS(null, 'class', cssClass);
        return circle;
    }
}
