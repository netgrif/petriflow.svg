import {Selectable} from './Selectable';
import {CanvasElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';

export abstract class PetriflowCanvasElement<T extends CanvasElement> implements Selectable<CanvasElement> {

    protected _element: T;
    protected _isSelected = false;

    protected constructor(element: T) {
        this._element = element;
    }

    // TODO: Later to abstract ? and differ for arc and node element
    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        const canvasElementBox = this.element.container.getBBox();
        return !(rectangle.x > canvasElementBox.x + canvasElementBox.width ||
            canvasElementBox.x > rectangle.x + rectangle.width ||
            rectangle.y > canvasElementBox.y + canvasElementBox.height ||
            canvasElementBox.y > rectangle.y + rectangle.height);
    }

    abstract getPosition(): DOMPoint;

    abstract move(position: DOMPoint): void;

    abstract getId(): string;

    get element() {
        return this._element;
    }

    copy(): CanvasElement {
        return this._element.clone();
    }

    select(): void {
        this._element.activate();
    }

    deselect(): void {
        this._element.deactivate();
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }
}
