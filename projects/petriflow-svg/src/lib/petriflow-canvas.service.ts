import {Injectable} from '@angular/core';
import {PetriflowCanvas} from './petriflow-canvas';
import {CanvasElementCollection} from './domain/canvas-element-collection';
import {PanzoomObject} from '@panzoom/panzoom';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: PetriflowCanvas | undefined;
    private readonly _petriflowElementsCollection: CanvasElementCollection;
    private _petriflowClipboardElementsCollection: CanvasElementCollection;
    private _panzoom: PanzoomObject | undefined;

    constructor() {
        this._petriflowElementsCollection = new CanvasElementCollection();
        this._petriflowClipboardElementsCollection = new CanvasElementCollection();
    }

    setSelectedByRectangleEnclosure(rectangle: SVGElement) {
        if (!this._canvas) {
            return;
        }
        const newRect = this._canvas.svg.createSVGRect();
        newRect.x = +(rectangle.getAttribute('x') ?? 0);
        newRect.y = +(rectangle.getAttribute('y') ?? 0);
        newRect.width = +(rectangle.getAttribute('width') ?? 0);
        newRect.height = +(rectangle.getAttribute('height') ?? 0);
        this._petriflowElementsCollection.all.forEach(petriflowElement => {
            if (petriflowElement.isEnclosedByRectangle(newRect)) {
                petriflowElement.setSelected(true);
                petriflowElement.activate();
            }
        });
    }

    copyElements(from: CanvasElementCollection, to: CanvasElementCollection, append = false): CanvasElementCollection {
        if (!append) {
            to = new CanvasElementCollection();
            to.places = from.places.filter(place => place.isSelected());
            to.transitions = from.transitions.filter(place => place.isSelected());
            to.arcs = from.arcs.filter(place => place.isSelected());
        } else {
            from.places.forEach(place => to.places.push(place));
            from.transitions.forEach(place => to.transitions.push(place));
            from.arcs.forEach(place => to.arcs.push(place));
        }
        return to;
    }

    get panzoom(): PanzoomObject | undefined {
        return this._panzoom;
    }

    set panzoom(value: PanzoomObject | undefined) {
        this._panzoom = value;
    }

    get xOffset(): number | undefined {
        return this?._panzoom?.getPan()?.x;
    }

    get yOffset(): number | undefined {
        return this?._panzoom?.getPan()?.y;
    }

    get scale(): number | undefined {
        return this?._panzoom?.getScale();
    }

    selectAll() {
        this.petriflowElementsCollection.all.forEach(element => {
            element.select();
        });
    }

    deselectAll() {
        this.petriflowElementsCollection.all.forEach(element => {
            element.deselect();
        });
    }

    get canvas(): PetriflowCanvas | undefined {
        return this._canvas;
    }

    set canvas(value: PetriflowCanvas | undefined) {
        this._canvas = value;
    }

    get petriflowElementsCollection(): CanvasElementCollection {
        return this._petriflowElementsCollection;
    }

    get petriflowClipboardElementsCollection(): CanvasElementCollection {
        return this._petriflowClipboardElementsCollection;
    }

    set petriflowClipboardElementsCollection(value: CanvasElementCollection) {
        this._petriflowClipboardElementsCollection = value;
    }
}
