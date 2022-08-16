import { Canvas } from 'projects/petri-svg/src/lib/canvas/canvas';
import {ArrowArcEnd} from '../../../petri-svg/src/lib/canvas/svg-elements/arc/arc-end/arrow-arc-end';
import {EmptyCircleArcEnd} from '../../../petri-svg/src/lib/canvas/svg-elements/arc/arc-end/empty-circle-arc-end';
import {FullCircleArcEnd} from '../../../petri-svg/src/lib/canvas/svg-elements/arc/arc-end/full-circle-arc-end';
import {DoubleArrowArcEnd} from '../../../petri-svg/src/lib/canvas/svg-elements/arc/arc-end/double-arrow-arc-end';

export class PetriflowCanvas extends Canvas {

    constructor(svg: SVGSVGElement) {
        super(svg);
        this.register(new ArrowArcEnd());
        this.register(new EmptyCircleArcEnd());
        this.register(new FullCircleArcEnd());
        this.register(new DoubleArrowArcEnd());
    }
}
