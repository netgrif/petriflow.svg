import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowTransition extends PetriflowNodeElement<Transition> {

    private static transitionIdCounter = 0;

    constructor(canvasElement: Transition) {
        super(canvasElement);
    }

    getId(): string {
        return `t${PetriflowTransition.transitionIdCounter++}`;
    }
}
