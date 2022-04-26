import {CanvasElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {StaticPlace} from '../../../../canvas/src/lib/canvas/svg-elements/place/static-place';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {SelectableArc} from '../svg-elements/selectable-arc';

export class CanvasElementCollection {

    private _places: Array<Place | StaticPlace>;
    private _transitions: Array<Transition>;
    private _arcs: Array<SelectableArc>;

    constructor() {
        this._places = [];
        this._transitions = [];
        this._arcs = [];
    }

    get places(): Array<Place | StaticPlace> {
        return this._places;
    }

    set places(value: Array<Place | StaticPlace>) {
        this._places = value;
    }

    get transitions(): Array<Transition> {
        return this._transitions;
    }

    set transitions(value: Array<Transition>) {
        this._transitions = value;
    }

    get arcs(): Array<SelectableArc> {
        return this._arcs;
    }

    set arcs(value: Array<SelectableArc>) {
        this._arcs = value;
    }

    get nodes(): Array<NodeElement> {
        return [...this._places, ...this._transitions];
    }

    get selected(): Array<NodeElement> {
        return [...this.nodes.filter(node => node.isSelected())];
    }
}
