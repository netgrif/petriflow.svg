import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowPlace extends PetriflowNodeElement<Place> {

    private static placeIdCounter = 0;
    protected _element: Place;

    constructor(canvasElement: Place) {
        super(canvasElement);
        this._element = canvasElement;

        canvasElement.element.onmouseenter = () => {
            canvasElement.activate();
        };
        canvasElement.element.onmouseleave = () => {
            canvasElement.deactivate();
        };
        canvasElement.markingTokens.forEach(token => {
            token.onmouseenter = () => {
                canvasElement.activate();
            };
            token.onmouseleave = () => {
                canvasElement.deactivate();
            };
        });
    }

    getId(): string {
        return `p${PetriflowPlace.placeIdCounter++}`;
    }

    changeId(id: string) {
        this._element.id = id;
    }
}
