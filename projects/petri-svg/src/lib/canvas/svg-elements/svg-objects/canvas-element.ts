import {Activable} from '../activable';
import {Container} from './container';

export abstract class CanvasElement extends Container implements Activable {

    private _isActive = false;
    private _isSelected = false;

    public static pointsToString(...points: Array<DOMPoint>): string {
        return points.map(p => `${p.x},${p.y}`).join(' ') + ' ';
    }

    public activate(): void {
        this._isActive = true;
    }

    public deactivate(): void {
        this._isActive = false;
    }

    public isActive(): boolean {
        return this._isActive;
    }

    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        const canvasElementBox = this.container.getBBox();
        return !(rectangle.x > canvasElementBox.x + canvasElementBox.width ||
            canvasElementBox.x > rectangle.x + rectangle.width ||
            rectangle.y > canvasElementBox.y + canvasElementBox.height ||
            canvasElementBox.y > rectangle.y + rectangle.height);
    }

    abstract moveBy(e: number, f: number): void;

    abstract clone(): CanvasElement | undefined;

    isSelected(): boolean {
        return this._isSelected;
    }

    setSelected(value: boolean) {
        this._isSelected = value;
    }

    public abstract getElements(): Array<SVGElement>;
}
