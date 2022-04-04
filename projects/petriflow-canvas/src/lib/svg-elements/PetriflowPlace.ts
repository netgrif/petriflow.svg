import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowPlace extends PetriflowNodeElement<Place> {

    private static placeIdCounter = 0;
    protected _element: Place;

    constructor(element: Place) {
        super(element);
        this._element = element;
    }

    getId(): string {
        return `p${PetriflowPlace.placeIdCounter++}`;
    }

    changeId(id: string) {
        this._element.id = id;
    }
}
