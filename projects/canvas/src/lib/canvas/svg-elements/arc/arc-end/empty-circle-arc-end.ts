import {CircleArcEnd} from './circle-arc-end';
import {CanvasConfiguration} from '../../../canvas-configuration';

export class EmptyCircleArcEnd extends CircleArcEnd {

    public static readonly ID = 'arc_end_circle_empty';

    constructor() {
        super(EmptyCircleArcEnd.ID);
        this.circle.setAttributeNS(null, 'fill', 'white');
        this.deactivate();
    }

    activate(): void {
        this.circle.setAttributeNS(null, 'stroke', CanvasConfiguration.COLORS.INACTIVE);
    }

    deactivate(): void {
        this.circle.setAttributeNS(null, 'stroke', CanvasConfiguration.COLORS.INACTIVE);
    }
}
