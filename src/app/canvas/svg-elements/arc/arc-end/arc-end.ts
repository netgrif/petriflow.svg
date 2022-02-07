import {CanvasConfiguration} from '../../../canvas-configuration';

export abstract class ArcEnd {

    private _arrow: SVGMarkerElement;
    private _id: string;

    private constructor(id: string, height: number, width: number, refX: number, refY: number) {
        this._id = id;
        this._arrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'marker') as SVGMarkerElement;
        this._arrow.setAttributeNS(null, 'id', id);
        this._arrow.setAttributeNS(null, 'markerHeight', `${height}`);
        this._arrow.setAttributeNS(null, 'markerWidth', `${width}`);
        this._arrow.setAttributeNS(null, 'refX', `${refX}`);
        this._arrow.setAttributeNS(null, 'refY', `${refY}`);
        this._arrow.setAttributeNS(null, 'orient', 'auto');
    }

    get arrow(): SVGMarkerElement {
        return this._arrow;
    }

    set arrow(arrow: SVGMarkerElement) {
        this._arrow = arrow;
    }

    abstract activate(): void;

    abstract deactivate(): void;
}
