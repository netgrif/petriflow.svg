import {Arc, NodeElement} from '@netgrif/petri.svg';
import {PetriflowArc} from '../svg-elements/petriflow-arc';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {PetriflowCanvasElement} from '../svg-elements/petriflow-canvas-element';
import {Subject} from "rxjs";
import {CanvasEventWrapper} from "./canvas-event-wrapper";
import {CanvasEventType} from "./canvas-event-type";

export class CanvasElementCollection {

    private _places: Array<PetriflowPlace>;
    private _transitions: Array<PetriflowTransition>;
    private _arcs: Array<PetriflowArc<Arc>>;

    private _eventEmitter$: Subject<CanvasEventWrapper>;

    constructor() {
        this._places = [];
        this._transitions = [];
        this._arcs = [];
        this._eventEmitter$ = new Subject<CanvasEventWrapper>();
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

    get eventEmitter(): Subject<CanvasEventWrapper> {
        return this._eventEmitter$;
    }

    pushEvent(element: PetriflowCanvasElement, eventType: CanvasEventType): void {
        this._eventEmitter$.next({element, eventType});
    }
}
