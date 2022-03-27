import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowPlace extends PetriflowNodeElement {

    private static placeIdCounter = 0;

    getId(): string {
        return `p${PetriflowPlace.placeIdCounter++}`;
    }
}
