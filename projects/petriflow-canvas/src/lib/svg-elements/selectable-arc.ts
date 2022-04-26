import {Selectable} from './selectable';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

export interface SelectableArc extends Selectable<SelectableArc> {

    getSource(): NodeElement;

    cloneArc(start: NodeElement, end: NodeElement);

    getDestination(): NodeElement;

    setSource(source: NodeElement): void;

    setDestination(destination: NodeElement): void;

    getBreakPointList(): Array<DOMPoint>;

    move(start: NodeElement, destination: NodeElement): void;

    setOnClick(event: (e, element) => void): void;
}
