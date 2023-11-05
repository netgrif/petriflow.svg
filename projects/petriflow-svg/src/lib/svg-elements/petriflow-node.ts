import {PetriflowCanvasElement} from './petriflow-canvas-element';
import {NodeElement} from '@netgrif/petri.svg';
import {EMPTY_FUNCTION, PetriflowNodeClickEventFunction} from "../common";

export abstract class PetriflowNode<T extends NodeElement> implements PetriflowCanvasElement {

    protected _canvasElement: T;
    protected _onClickEvent: PetriflowNodeClickEventFunction;
    protected _onContextEvent: PetriflowNodeClickEventFunction;

    protected constructor(canvasElement: T) {
        this._canvasElement = canvasElement;
        // TODO: PF-48 remove events
        this._onClickEvent = EMPTY_FUNCTION;
        this._onContextEvent = EMPTY_FUNCTION;
    }

    setOnClick(event: PetriflowNodeClickEventFunction): void {
        this.onClickEvent = event;
        this.canvasElement.element.onclick = (mouseEvent: Event | undefined) => {
            event(this, mouseEvent);
        };
    }

    setOnContext(event: PetriflowNodeClickEventFunction): void {
        this.onContextEvent = event;
        this.canvasElement.element.oncontextmenu = (mouseEvent: Event | undefined) => {
            event(this, mouseEvent);
        }
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

    get onContextEvent() {
        return this._onContextEvent;
    }

    set onContextEvent(value) {
        this._onContextEvent = value;
    }

    abstract clone(): PetriflowNode<NodeElement>;

    abstract changeId(id: string): void;

    abstract move(position: DOMPoint): void;
}
