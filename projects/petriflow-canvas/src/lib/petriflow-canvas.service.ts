import {Injectable} from '@angular/core';
import {CanvasElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {PetriflowCanvasElement} from './svg-elements/PetriflowCanvasElement';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: PetriflowCanvas;
    private _clipboard: SVGElement;
    private _petriflowElements: Array<PetriflowCanvasElement<CanvasElement>>;
    private _selectedElements: Array<PetriflowCanvasElement<CanvasElement>>;

    constructor() {
        this._petriflowElements = [];
        this._selectedElements = [];
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

    get petriflowElements(): Array<PetriflowCanvasElement<CanvasElement>> {
        return this._petriflowElements;
    }
}
