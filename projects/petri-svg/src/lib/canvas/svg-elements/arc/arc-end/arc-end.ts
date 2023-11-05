import {CanvasConfiguration} from '../../../canvas-configuration';

export abstract class ArcEnd {

    protected id: string;
    protected height: number;
    protected width: number;
    protected refX: number;
    protected refY: number;

    protected constructor(id: string, height: number, width: number, refX: number, refY: number) {
        this.id = id;
        this.height = height;
        this.width = width;
        this.refX = refX;
        this.refY = refY;
    }

    public arrow(): SVGMarkerElement {
        const arrow = this.defaultArrow(`${this.id}`);
        arrow.setAttributeNS(null, 'class', `svg-inactive-fill`);
        return arrow;
    }

    public activeArrow(): SVGMarkerElement {
        const arrow = this.defaultArrow(`${this.id}-active`);
        arrow.setAttributeNS(null, 'class', `svg-active-fill`);
        return arrow;
    }

    private defaultArrow(id: string): SVGMarkerElement {
        const arrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'marker') as SVGMarkerElement;
        arrow.setAttributeNS(null, 'id', id);
        arrow.setAttributeNS(null, 'markerHeight', `${this.height}`);
        arrow.setAttributeNS(null, 'markerWidth', `${this.width}`);
        arrow.setAttributeNS(null, 'refX', `${this.refX}`);
        arrow.setAttributeNS(null, 'refY', `${this.refY}`);
        arrow.setAttributeNS(null, 'orient', 'auto');
        arrow.setAttributeNS(null, 'overflow', `visible`);
        return arrow;
    }
}
