import {CanvasConfiguration} from '../../canvas-configuration';

export class Container {

    private _container: SVGGElement;

    protected constructor() {
        this._container = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
    }

    get container(): SVGGElement {
        return this._container;
    }

    set container(value: SVGGElement) {
        this._container = value;
    }
}
