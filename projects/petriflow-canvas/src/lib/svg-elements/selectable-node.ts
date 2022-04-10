import {Selectable} from './selectable';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

export interface SelectableNode<T> extends Selectable<NodeElement> {

    getPosition(): DOMPoint;

    move(position: DOMPoint): void;

}
