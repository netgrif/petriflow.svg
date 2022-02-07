import {CircleArcEnd} from './circle-arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export class EmptyCircleArcEnd extends CircleArcEnd {

    constructor() {
        super('read_arc_end_point');
        this.circle.setAttributeNS(null, 'fill', 'white');
    }

    activate(): void {
        this.circle.setAttributeNS(null, 'stroke', CanvasConfiguration.COLORS.INACTIVE);
    }

    deactivate(): void {
        this.circle.setAttributeNS(null, 'stroke', CanvasConfiguration.COLORS.INACTIVE);
    }
}
