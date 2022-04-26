import {NodeElement} from 'projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {SelectableArc} from '../selectable-arc';
import {ReadArc} from '../../../../../canvas/src/lib/canvas/svg-elements/arc/read-arc';

export class PetriflowReadArc extends ReadArc implements SelectableArc {

    private _onClickEvent;

    constructor(start: NodeElement, end: NodeElement, linePoints: Array<DOMPoint>, multiplicityLabel: string) {
        super(start, end, linePoints, multiplicityLabel);

        this.arcLine.onmouseenter = () => {
            this.activate();
        };
        this.arcLine.onmouseleave = () => {
            if (!this.isSelected()) {
                this.deactivate();
            }
        };
    }

    deselect(): void {
        this.setSelected(false);
        this.deactivate();
    }

    select(): void {
        this.setSelected(true);
        this.activate();
    }

    getContainer(): SVGGElement {
        return this.container;
    }

    getDestination(): NodeElement {
        return undefined;
    }

    getSource(): NodeElement {
        return undefined;
    }

    cloneArc(start: NodeElement,  end: NodeElement): PetriflowReadArc {
        const newLinePoints = [];
        this.linePoints.forEach(point => newLinePoints.push(Object.assign({}, {
            x: point.x,
            y: point.y
        } as DOMPoint)));
        const cloned = new PetriflowReadArc(start, end, newLinePoints, this.multiplicity?.textContent);
        cloned.arcLine.onclick = () => this._onClickEvent(cloned);
        cloned.setOnClick((clone) => this._onClickEvent(clone));
        return cloned;
    }

    setOnClick(event: (e, element) => void): void {
        this._onClickEvent = event;
        this.arcLine.onclick = (e) => {
            event(e, this);
        };
    }

    getBreakPointList(): Array<DOMPoint> {
        return this.linePoints;
    }

    setSource(source: NodeElement): void {
        this.start = source;
    }

    setDestination(destination: NodeElement): void {
        this.end = destination;
    }

}
