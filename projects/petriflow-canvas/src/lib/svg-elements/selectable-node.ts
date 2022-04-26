import {Selectable} from './selectable';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import { Arc } from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';

export interface SelectableNode extends Selectable<NodeElement> {

    getPosition(): DOMPoint;

    move(position: DOMPoint): void;

    getEdgeIntersection(point: DOMPoint, offset: number): DOMPoint;

    deleteArcs(removedArcs: Array<Arc>): void;
}
