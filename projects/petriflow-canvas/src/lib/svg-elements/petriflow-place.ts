import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowNode} from './petriflow-node';

export class PetriflowPlace extends PetriflowNode<Place> {

    private _onTokenClickEvent;

    constructor(place: Place) {
        super(place);
        this.canvasElement.markingTokens.forEach(markingToken => {
            this.setPlaceActions(markingToken);
        });
    }

    private setPlaceActions(svgElement: SVGElement) {
        svgElement.onmouseenter = () => {
            this.canvasElement.activate();
        };
        svgElement.onmouseleave = () => {
            if (!this.isSelected()) {
                this.canvasElement.deactivate();
            }
        };
    }

    clone(): PetriflowPlace {
        const cloned = new PetriflowPlace(this.canvasElement.clone());
        cloned.canvasElement.element.onclick = () => this.onClickEvent(cloned);
        cloned.canvasElement.markingTokens.forEach(token => {
            token.onclick = () => this._onTokenClickEvent(cloned);
        });
        cloned.setOnClick((clone) => this.onClickEvent(clone));
        cloned.setOnTokenClickEvent((clone) => this._onTokenClickEvent(clone));
        return cloned;
    }

    setOnTokenClickEvent(event: (element) => void): void {
        this._onTokenClickEvent = event;
        this.canvasElement.markingTokens.forEach(token => {
            token.onclick = () => {
                event(this);
            };
        });
    }
}
