import {Injectable} from '@angular/core';
import {CanvasElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {CanvasConfiguration} from '../../../canvas/src/lib/canvas/canvas-configuration';
import {LabeledObject} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/labeled-object';
import {PetriflowCanvasElement} from './svg-elements/PetriflowCanvasElement';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: PetriflowCanvas;
    private _clipboard: SVGElement;
    private _labeledObjects: Array<LabeledObject>;
    private _petriflowElements: Array<PetriflowCanvasElement<CanvasElement>>;

    constructor() {
        this._clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this._clipboard.id = 'groupa';
        this._labeledObjects = [];
        this._petriflowElements = [];
    }

    get canvas(): PetriflowCanvas {
        return this._canvas;
    }

    set canvas(value: PetriflowCanvas) {
        this._canvas = value;
    }

    get clipboard(): SVGElement {
        return this._clipboard;
    }

    set clipboard(value: SVGElement) {
        this._clipboard = value;
    }

    getEnclosedElementsByRectangle(rectangle: SVGElement): Array<PetriflowCanvasElement<any>> {
        const newRect = this.canvas.svg.createSVGRect();
        newRect.x = +rectangle.getAttribute('x');
        newRect.y = +rectangle.getAttribute('y');
        newRect.width = +rectangle.getAttribute('width');
        newRect.height = +rectangle.getAttribute('height');
        return this._petriflowElements.filter(petriflowElement => petriflowElement.isEnclosedByRectangle(newRect));
    }

    copyElements(elements: Array<PetriflowCanvasElement<any>>) {
        elements.forEach(element => {
            const copyObject = element.element.clone();
            this.clipboard.appendChild(copyObject.container);
        });
        this.canvas.container.appendChild(this.clipboard);
    }

    deleteSelectedElements() {
    }

    get labeledObjects(): Array<LabeledObject> {
        return this._labeledObjects;
    }

    get petriflowElements(): Array<PetriflowCanvasElement<CanvasElement>> {
        return this._petriflowElements;
    }
}
