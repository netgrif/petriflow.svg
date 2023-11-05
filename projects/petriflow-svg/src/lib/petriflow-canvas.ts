import {ArrowArcEnd, Canvas, DoubleArrowArcEnd, EmptyCircleArcEnd, FullCircleArcEnd} from '@netgrif/petri.svg';

export class PetriflowCanvas extends Canvas {

    constructor(svg: SVGSVGElement, defs?: SVGDefsElement) {
        super(svg, defs);
        this.register(new ArrowArcEnd());
        this.register(new EmptyCircleArcEnd());
        this.register(new FullCircleArcEnd());
        this.register(new DoubleArrowArcEnd());
    }
}
