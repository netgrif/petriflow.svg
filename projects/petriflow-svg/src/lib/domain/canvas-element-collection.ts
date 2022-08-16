import {NodeElement} from '../../../../petri-svg/src/lib/canvas/svg-elements/svg-objects/node-element';
import {PetriflowArc} from '../svg-elements/petriflow-arc';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {Arc} from '../../../../petri-svg/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {PetriflowCanvasElement} from '../svg-elements/petriflowCanvasElement';

export class CanvasElementCollection {

    private _places: Array<PetriflowPlace>;
    private _transitions: Array<PetriflowTransition>;
    private _arcs: Array<PetriflowArc<Arc>>;

    constructor() {
        this._places = [];
        this._transitions = [];
        this._arcs = [];
    }

    get places(): Array<PetriflowPlace> {
        return this._places;
    }

    set places(value: Array<PetriflowPlace>) {
        this._places = value;
    }

    get transitions(): Array<PetriflowTransition> {
        return this._transitions;
    }

    set transitions(value: Array<PetriflowTransition>) {
        this._transitions = value;
    }

    get arcs(): Array<PetriflowArc<Arc>> {
        return this._arcs;
    }

    set arcs(value: Array<PetriflowArc<Arc>>) {
        this._arcs = value;
    }

    get nodes(): Array<PetriflowNode<NodeElement>> {
        return [...this._places, ...this._transitions];
    }

    get selected(): Array<PetriflowNode<NodeElement>> {
        return [...this.nodes.filter(node => node.isSelected())];
    }

    get all(): Array<PetriflowCanvasElement> {
        return [...this.nodes, ...this.arcs];
    }
}
