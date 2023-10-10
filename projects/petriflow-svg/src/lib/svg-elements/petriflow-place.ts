import {Place} from '@netgrif/petri.svg';
import {PetriflowNode} from './petriflow-node';
import {PetriflowCanvasConfiguration} from '../petriflow-canvas-configuration';
import {defaultPlace, EMPTY_FUNCTION, PetriflowNodeClickEventFunction} from '../common';

export class PetriflowPlace extends PetriflowNode<Place> {

    private _onTokenClickEvent: PetriflowNodeClickEventFunction;

    constructor(place: Place) {
        super(place);
        this._onTokenClickEvent = EMPTY_FUNCTION;
        this.changeId(place.id);
    }

    public static of(id: string, label: string, marking: number, position: DOMPoint): PetriflowPlace {
        return new PetriflowPlace(new Place(id, label, marking, position));
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
        };
    }

    changeId(id: string): void {
        this.canvasElement.id = `svg_place_${id}`;
        this.canvasElement.label.textContent = id;
        this.canvasElement.labelElement.id = `svg_place_label_${id}`;
        this.canvasElement.markingElement.id = `svg_place_marking_number_${id}`;
        this.canvasElement.markingTokens.forEach((token, index) => token.id = `svg_place_marking_token_${index}_${id}`);
    }

    move(position: DOMPoint) {
        this.canvasElement.move(position);
    }
}
