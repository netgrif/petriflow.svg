import {StaticPlace} from '../../../../canvas/src/lib/canvas/svg-elements/place/static-place';
import {SelectableNode} from './selectable-node';
import {PetriflowPlace} from './petriflow-place';

export class PetriflowStaticPlace extends StaticPlace implements SelectableNode {

    private _onClickEvent;

    constructor(marking: number, position: DOMPoint) {
        super(`p${PetriflowPlace.COUNTER++}`, `p${PetriflowPlace.COUNTER}`, marking, position);
    }

    getPosition(): DOMPoint {
        return this.position;
    }

    deselect(): void {
        this.setSelected(false);
        this.deactivate();
    }

    select(): void {
        this.setSelected(true);
        this.activate();
    }

    getContainer(): SVGGElement {
        return this.container;
    }

    clone(): PetriflowStaticPlace {
        const cloned = new PetriflowStaticPlace(this.marking, this.position);
        cloned.element.onclick = () => this._onClickEvent(cloned);
        return cloned;
    }

    setOnClick(event: (element) => void): void {
        this._onClickEvent = event;
        this.element.onclick = () => {
            event(this);
        };
    }
}
