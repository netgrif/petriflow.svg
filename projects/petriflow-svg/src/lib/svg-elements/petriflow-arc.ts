import {PetriflowCanvasElement} from './petriflowCanvasElement';
import {Arc} from '../../../../petri-svg/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {NodeElement} from '../../../../petri-svg/src/lib/canvas/svg-elements/svg-objects/node-element';

export abstract class PetriflowArc<T extends Arc> implements PetriflowCanvasElement {

    protected _element: T;
    protected _onClickEvent;

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
    }

    cloneArc(start: NodeElement, end: NodeElement): PetriflowArc<Arc> {
        const newLinePoints = [];
        this.element.linePoints.forEach(point => newLinePoints.push(Object.assign({}, {
            x: point.x,
            y: point.y
        } as DOMPoint)));
        const cloned = this.createClonedInstanceOfArc(start, end, newLinePoints, this._element.multiplicity?.textContent);
        cloned.element.arcLine.onclick = () => this._onClickEvent(cloned);
        cloned.setOnClick((clone) => this._onClickEvent(clone));
        return cloned;
    }

    abstract createClonedInstanceOfArc(start: NodeElement, end: NodeElement, points: Array<DOMPoint>, multiplicity: string): PetriflowArc<Arc>;

    activate(): void {
        this._element.activate();
    }

    isEnclosedByRectangle(rectangle: SVGRect): boolean {
        return this._element.isEnclosedByRectangle(rectangle);
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

    setOnClick(event: (e, element) => void): void {
        this._onClickEvent = event;
        this.element.arcLine.onclick = (e) => {
            event(e, this);
        };
    }
}
