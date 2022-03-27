import {Activable} from '../activable';
import {Container} from './container';

export abstract class CanvasElement extends Container implements Activable {

    public static pointsToString(...points: Array<DOMPoint>): string {
        return points.map(p => `${p.x},${p.y}`).join(' ') + ' ';
    }

    abstract activate(): void;

    abstract deactivate(): void;

    clone(): CanvasElement {
        const copyObject: CanvasElement = Object.create(this) as CanvasElement;
        copyObject.container = this.container.cloneNode(true) as SVGGElement;
        return copyObject;
    }
}
