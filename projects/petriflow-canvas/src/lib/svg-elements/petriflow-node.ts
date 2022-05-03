import {PetriflowCanvasElement} from './petriflowCanvasElement';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

export abstract class PetriflowNode<T extends NodeElement> implements PetriflowCanvasElement {

    protected _element: T;
    protected _onClickEvent;

    protected constructor(element: T) {
        this._element = element;

        element.element.onmouseenter = () => {
            this.element.activate();
        };
        element.element.onmouseleave = () => {
            if (!this.isSelected()) {
                this.element.deactivate();
            }
        };
    }

    setOnClick(event: (element) => void): void {
        this.onClickEvent = event;
        this.element.element.onclick = () => {
            event(this);
        };
    }

    isSelected(): boolean {
        return this.element.isSelected();
    }

    deselect(): void {
        this.element.setSelected(false);
        this.element.deactivate();
    }

    select(): void {
        this.element.setSelected(true);
        this.element.activate();
    }

    getPosition(): DOMPoint {
        return this.element.position;
    }

    activate(): void {
        this.element.activate();
    }

    deactivate(): void {
        this.element.deactivate();
    }

    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        return this.element.isEnclosedByRectangle(rectangle);
    }

    moveBy(x: number, y: number): void {
        this.element.moveBy(x, y);
    }

    setSelected(value: boolean): void {
        this.element.setSelected(value);
    }

    get element(): T {
        return this._element;
    }

    set element(value: T) {
        this._element = value;
    }

    get onClickEvent() {
        return this._onClickEvent;
    }

    set onClickEvent(value) {
        this._onClickEvent = value;
    }

    abstract clone(): PetriflowNode<NodeElement>;
}
