import {Arc, NodeElement, Place, Transition} from '@netgrif/petri.svg';
import {PetriflowNode} from "./svg-elements/petriflow-node";
import {PetriflowArc} from "./svg-elements/petriflow-arc";

export type PetriflowNodeClickEventFunction = (element: PetriflowNode<NodeElement> | PetriflowArc<Arc>, e ?: Event) => void;

export function defaultPlace(): Place {
    return new Place('0', '0', 0, new DOMPoint());
}

export function defaultTransition(): Transition {
    return new Transition('0', '0', new DOMPoint())
}

const EMPTY_FUNCTION = () => {
};
export {EMPTY_FUNCTION};
