import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowPlace extends PetriflowNodeElement<Place> {

    private static placeIdCounter = 0;
    constructor(element: Place) {
        super(element);
    }

    getId(): string {
        return `p${PetriflowPlace.placeIdCounter++}`;
    }
}
