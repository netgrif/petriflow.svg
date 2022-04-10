import {Selectable} from './selectable';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import { Arc } from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';

export interface SelectableArc extends Selectable<Arc> {

    getSource(): NodeElement;

    getDestination(): NodeElement;

    move(start: NodeElement, destination: NodeElement): void;

}
