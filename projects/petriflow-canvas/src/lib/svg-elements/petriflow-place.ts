import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {SelectableNode} from './selectable-node';

export class PetriflowPlace extends Place implements SelectableNode {

    static COUNTER = 0;
    private _onClickEvent;
    private _onTokenClickEvent;

    constructor(marking: number, position: DOMPoint) {
        super(`p${PetriflowPlace.COUNTER++}`, `p${PetriflowPlace.COUNTER}`, marking, position);

        this.setPlaceActions(this.element);

        this.markingTokens.forEach(markingToken => {
            this.setPlaceActions(markingToken);
        });
    }

    private setPlaceActions(svgElement: SVGElement) {
        svgElement.onmouseenter = () => {
            this.activate();
        };
        svgElement.onmouseleave = () => {
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

    getPosition(): DOMPoint {
        return this.position;
    }

    getContainer(): SVGGElement {
        return this.container;
    }

    clone(): PetriflowPlace {
        const cloned = new PetriflowPlace(this.tokensCount, this.position);
        cloned.element.onclick = () => this._onClickEvent(cloned);
        cloned.markingTokens.forEach(token => {
            token.onclick = () => this._onTokenClickEvent(cloned);
        });
        cloned.setOnClick((clone) => this._onClickEvent(clone));
        cloned.setOnTokenClickEvent((clone) => this._onTokenClickEvent(clone));
        return cloned;
    }

    setOnClick(event: (element) => void): void {
        this._onClickEvent = event;
        this.element.onclick = () => {
            event(this);
        };
    }

    setOnTokenClickEvent(event: (element) => void): void {
        this._onTokenClickEvent = event;
        this.markingTokens.forEach(token => {
            token.onclick = () => {
                event(this);
            };
        });
    }
}
