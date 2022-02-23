import {CircleArcEnd} from './circle-arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export class FullCircleArcEnd extends CircleArcEnd {

    public static readonly ID = 'read_arc_end';

    constructor() {
        super(FullCircleArcEnd.ID);
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
