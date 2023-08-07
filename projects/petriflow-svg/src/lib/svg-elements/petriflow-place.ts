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
        this.setPlaceActions(this.canvasElement.markingElement);
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
        cloned.canvasElement.markingTokens.forEach(token => {
            token.onclick = () => this._onTokenClickEvent(cloned);
        });
        cloned.setOnClick((clone) => this.onClickEvent(clone));
        cloned.setOnContext((clone) => this.onContextEvent(clone));
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
        this.canvasElement.markingElement.onclick = () => {
            event(this);
        }
    }

    changeId(id: string): void {
        this.canvasElement.id = `svg_place_${id}`;
        this.canvasElement.label.textContent = id;
    }

    move(position: DOMPoint) {
        this.canvasElement.move(position);
    }
}
