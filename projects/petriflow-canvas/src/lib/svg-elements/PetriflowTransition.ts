import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowTransition extends PetriflowNodeElement {

    private static transitionIdCounter = 0;

    getId(): string {
        return `t${PetriflowTransition.transitionIdCounter++}`;
    }
}
