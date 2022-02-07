import {CanvasConfiguration} from '../../canvas-configuration';
import {Activable} from '../activable';

export abstract class CanvasElement implements Activable {
    private _container: SVGGElement;

    protected constructor() {
        this._container = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
    }

    public static pointsToString(...points: Array<DOMPoint>): string {
        return points.map(p => `${p.x},${p.y}`).join(' ') + ' ';
    }

    abstract activate(): void;

    abstract deactivate(): void;

    get container(): SVGGElement {
        return this._container;
    }

    set container(value: SVGGElement) {
        this._container = value;
    }
}
