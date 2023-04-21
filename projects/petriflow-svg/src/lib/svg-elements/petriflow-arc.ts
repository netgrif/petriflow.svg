import {PetriflowCanvasElement} from './petriflow-canvas-element';
import {Arc, NodeElement} from '@netgrif/petri.svg';
import {EMPTY_FUNCTION, PetriflowNodeClickEventFunction} from "../common";

export abstract class PetriflowArc<T extends Arc> implements PetriflowCanvasElement {

    protected _element: T;
    protected _onClickEvent: PetriflowNodeClickEventFunction

    protected constructor(element: T) {
        this._element = element;
        this._element.arcLine.onmouseenter = () => {
            this.activate();
        };
        this._element.arcLine.onmouseleave = () => {
            if (!this.isSelected()) {
                this._element.deactivate();
            }
        };
        this._onClickEvent = EMPTY_FUNCTION;
    }

    cloneArc(id: string, start: NodeElement, end: NodeElement): PetriflowArc<Arc> {
        const newLinePoints: Array<DOMPoint> = [];
        this.element.linePoints.forEach(point => newLinePoints.push(Object.assign({}, {
            x: point.x,
            y: point.y
        } as DOMPoint)));
        const cloned = this.createClonedInstanceOfArc(id, start, end, newLinePoints, this._element.multiplicity?.textContent ?? '');
        cloned.element.arcLine.onclick = () => this._onClickEvent(cloned);
        cloned.setOnClick((clone) => this._onClickEvent(clone));
        return cloned;
    }

    abstract createClonedInstanceOfArc(id: string, start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string): PetriflowArc<Arc>;

    activate(): void {
        this._element.activate();
    }

    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        return this._element.isEnclosedByRectangle(rectangle); // TODO
    }

    isSelected(): boolean {
        return this._element.isSelected();
    }

    moveBy(x: number, y: number): void {
        this._element.moveBy(x, y);
    }

    deselect(): void {
        this.setSelected(false);
        this._element.deactivate();
    }

    select(): void {
        this.setSelected(true);
        this.activate();
    }

    setSelected(value: boolean): void {
        this._element.setSelected(value);
    }

    get element(): T {
        return this._element;
    }

    set element(value: T) {
        this._element = value;
    }

    getBreakPointList(): Array<DOMPoint> {
        return this.element.linePoints;
    }

    setSource(source: NodeElement): void {
        this.element.start = source;
    }

    setOnClick(eventFunction: PetriflowNodeClickEventFunction): void {
        this._onClickEvent = eventFunction;
        this.element.arcLine.onclick = (e) => {
            eventFunction(this, e);
        };
    }
}
