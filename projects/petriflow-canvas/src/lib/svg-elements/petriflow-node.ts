import {PetriflowCanvasElement} from './petriflowCanvasElement';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

export abstract class PetriflowNode<T extends NodeElement> implements PetriflowCanvasElement {

    protected _canvasElement: T;
    protected _onClickEvent;

    protected constructor(canvasElement: T) {
        this._canvasElement = canvasElement;

        canvasElement.element.onmouseenter = () => {
            this.canvasElement.activate();
        };
        canvasElement.element.onmouseleave = () => {
            if (!this.isSelected()) {
                this.canvasElement.deactivate();
            }
        };
    }

    setOnClick(event: (element) => void): void {
        this.onClickEvent = event;
        this.canvasElement.element.onclick = () => {
            event(this);
        };
    }

    isSelected(): boolean {
        return this.canvasElement.isSelected();
    }

    deselect(): void {
        this.canvasElement.setSelected(false);
        this.canvasElement.deactivate();
    }

    select(): void {
        this.canvasElement.setSelected(true);
        this.canvasElement.activate();
    }

    getPosition(): DOMPoint {
        return this.canvasElement.position;
    }

    activate(): void {
        this.canvasElement.activate();
    }

    deactivate(): void {
        this.canvasElement.deactivate();
    }

    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        return this.canvasElement.isEnclosedByRectangle(rectangle);
    }

    moveBy(x: number, y: number): void {
        this.canvasElement.moveBy(x, y);
    }

    setSelected(value: boolean): void {
        this.canvasElement.setSelected(value);
    }

    get canvasElement(): T {
        return this._canvasElement;
    }

    set canvasElement(value: T) {
        this._canvasElement = value;
    }

    get onClickEvent() {
        return this._onClickEvent;
    }

    set onClickEvent(value) {
        this._onClickEvent = value;
    }

    abstract clone(): PetriflowNode<NodeElement>;

    abstract changeId(id: string);
}
