import {Place} from '@netgrif/petri.svg';
import {PetriflowNode} from './petriflow-node';
import {PetriflowCanvasConfiguration} from '../petriflow-canvas-configuration';
import {defaultPlace, EMPTY_FUNCTION, PetriflowNodeClickEventFunction} from "../common";

export class PetriflowPlace extends PetriflowNode<Place> {

    private _onTokenClickEvent: PetriflowNodeClickEventFunction;

    constructor(place: Place) {
        super(place);
        this.canvasElement.markingTokens.forEach(markingToken => {
            this.setPlaceActions(markingToken);
        });
        this._onTokenClickEvent = EMPTY_FUNCTION;
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
        const cloned = new PetriflowPlace(this.canvasElement.clone() ?? defaultPlace());
        cloned.canvasElement.element.onclick = () => this.onClickEvent(cloned);
        cloned.canvasElement.markingTokens.forEach(token => {
            token.onclick = () => this._onTokenClickEvent(cloned);
        });
        cloned.setOnClick((clone) => this.onClickEvent(clone));
        cloned.setOnTokenClickEvent((clone) => this._onTokenClickEvent(clone));
        cloned.changeId(`p${++PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`);
        return cloned;
    }

    setOnTokenClickEvent(event: PetriflowNodeClickEventFunction): void {
        this._onTokenClickEvent = event;
        this.canvasElement.markingTokens.forEach(token => {
            token.onclick = () => {
                event(this);
            };
        });
    }

    changeId(id: string): void {
        this.canvasElement.id = id;
        this.canvasElement.label.textContent = id;
    }
}
