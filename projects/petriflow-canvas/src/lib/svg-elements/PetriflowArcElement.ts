import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {PetriflowCanvasElement} from './PetriflowCanvasElement';

export class PetriflowArcElement extends PetriflowCanvasElement<Arc> {

    private static arcIdCounter = 0;

    constructor(element: Arc) {
        super(element);

        element.arcLine.onmouseenter = () => {
            element.activate();
        };
        element.arcLine.onmouseleave = () => {
            element.deactivate();
        };
    }

    getId(): string {
        return `a${PetriflowArcElement.arcIdCounter++}`;
    }

    getPosition(): DOMPoint {
        // TODO: get breakpoints
        return undefined;
    }

    move(position: DOMPoint): void {
        // TODO: Move breakpoints
    }

    changeId(id: string) {
    }

}
