import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {PetriflowNodeElement} from './PetriflowNodeElement';

export class PetriflowTransition extends PetriflowNodeElement<Transition> {

    private static transitionIdCounter = 0;
    protected _element: Transition;

    constructor(canvasElement: Transition) {
        super(canvasElement);
        this._element = canvasElement;
    }

    getId(): string {
        return `t${PetriflowTransition.transitionIdCounter++}`;
    }

    changeId(id: string) {
        this._element.id = id;
    }
}
