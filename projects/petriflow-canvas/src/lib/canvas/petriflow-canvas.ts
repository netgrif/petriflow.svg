import {Canvas} from './canvas';
import {ArrowArcEnd} from './svg-elements/arc/arc-end/arrow-arc-end';
import {EmptyCircleArcEnd} from './svg-elements/arc/arc-end/empty-circle-arc-end';
import {FullCircleArcEnd} from './svg-elements/arc/arc-end/full-circle-arc-end';
import {DoubleArrowArcEnd} from './svg-elements/arc/arc-end/double-arrow-arc-end';

export class PetriflowCanvas extends Canvas {

    constructor(svg: SVGSVGElement) {
        super(svg);
        this.register(new ArrowArcEnd());
        this.register(new EmptyCircleArcEnd());
        this.register(new FullCircleArcEnd());
        this.register(new DoubleArrowArcEnd());
    }
}
