import {CircleArcEnd} from './circle-arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export class FullCircleArcEnd extends CircleArcEnd {

    constructor() {
        super('read_arc_end');
        this.deactivate();
    }

    activate(): void {
        this.circle.setAttributeNS(null, 'stroke', CanvasConfiguration.COLORS.ACTIVE);
        this.circle.setAttributeNS(null, 'fill', CanvasConfiguration.COLORS.ACTIVE);
    }

    deactivate(): void {
        this.circle.setAttributeNS(null, 'stroke', CanvasConfiguration.COLORS.INACTIVE);
        this.circle.setAttributeNS(null, 'fill', CanvasConfiguration.COLORS.INACTIVE);
    }
}
