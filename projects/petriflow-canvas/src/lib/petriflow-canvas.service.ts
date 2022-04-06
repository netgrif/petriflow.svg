import {Injectable} from '@angular/core';
import {CanvasElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {PetriflowCanvasElement} from './svg-elements/PetriflowCanvasElement';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';
import {CanvasConfiguration} from '../../../canvas/src/lib/canvas/canvas-configuration';
import {PetriflowNodeElement} from './svg-elements/PetriflowNodeElement';
import {PanZoom, Transform} from 'panzoom';
import {PetriflowArcElement} from './svg-elements/PetriflowArcElement';
import {NodeElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: PetriflowCanvas;
    private _clipboard: SVGElement;
    private _petriflowElements: Array<PetriflowCanvasElement<CanvasElement>>;
    private _selectedElements: Array<PetriflowCanvasElement<CanvasElement>>;
    private _copiedElements: Array<PetriflowCanvasElement<CanvasElement>>;
    private _pastedElements: Array<PetriflowCanvasElement<CanvasElement>>;
    private _panzoom: PanZoom;

    constructor() {
        this._petriflowElements = [];
        this._selectedElements = [];
        this._copiedElements = [];
        this._pastedElements = [];
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

    initialiseClipboard() {
        this._clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this._clipboard.id = 'canvas-clipboard';
    }

    destroyClipboard() {
        const matrix = (this.clipboard as SVGSVGElement).transform.baseVal[0].matrix;
        this._pastedElements.forEach(copyElement => {
            if (copyElement instanceof PetriflowNodeElement) {
                copyElement.moveBy(matrix.e, matrix.f);
                copyElement.element.arcs = [];
            } else if (copyElement instanceof PetriflowArcElement) {
                // TODO: refactor this later
                const source = copyElement.element.start;
                const destination = copyElement.element.end;
                const startIndex = this._copiedElements.findIndex(startElement => {
                    return source === startElement.element;
                });
                const endIndex = this._copiedElements.findIndex(endElement => {
                    return destination === endElement.element;
                });
                copyElement.element.start = this._pastedElements[startIndex].element as NodeElement;
                copyElement.element.end = this._pastedElements[endIndex].element as NodeElement;
                (this._pastedElements[startIndex].element as NodeElement).arcs.push(copyElement.element);
                (this._pastedElements[endIndex].element as NodeElement).arcs.push(copyElement.element);
                (this._pastedElements[startIndex] as PetriflowNodeElement<NodeElement>).moveBy(0, 0);
            }
            this.canvas.container.appendChild(copyElement.element.container);
            this.petriflowElements.push(copyElement);
        });
        this.canvas.container.removeChild(this.clipboard);
        this.clipboard = undefined;
        this._pastedElements = [];
    }

    getEnclosedElementsByRectangle(rectangle: SVGElement): Array<PetriflowCanvasElement<any>> {
        const newRect = this.canvas.svg.createSVGRect();
        newRect.x = +rectangle.getAttribute('x');
        newRect.y = +rectangle.getAttribute('y');
        newRect.width = +rectangle.getAttribute('width');
        newRect.height = +rectangle.getAttribute('height');
        return this._petriflowElements.filter(petriflowElement => petriflowElement.isEnclosedByRectangle(newRect));
    }

    copyElements() {
        this.copiedElements = this.selectedElements;
        this.selectedElements = [];
    }

    pasteElements() {
        this.initialiseClipboard();
        this.copiedElements.forEach(element => {
            const copyObject = element.copy();
            this.clipboard.appendChild(copyObject.element.container);
            this._pastedElements.push(copyObject);
        });
        this.canvas.container.appendChild(this.clipboard);
        const clipboardBox = this.clipboard.getBoundingClientRect();
        this.canvas.svg.onmousemove = (e) => {
            if (this.clipboard) {
                const offset = this.getPanZoomOffset();
                const mouseX = (e.x - offset.x) / offset.scale - (clipboardBox.x + clipboardBox.width / 2 - offset.x) / offset.scale;
                const mouseY = (e.y - offset.y) / offset.scale - (clipboardBox.y + clipboardBox.height / 2 - offset.y) / offset.scale;
                this.clipboard.setAttribute('transform', `matrix(1,0,0,1,${mouseX},${mouseY})`);
            }
        };
        this.canvas.svg.onmousedown = (e) => {
            if (this.clipboard) {
                this.destroyClipboard();
            }
        };
    }

    deleteSelectedElements() {
        this.selectedElements.forEach(selectedElement => {
            if (selectedElement instanceof PetriflowNodeElement) {
                const removedArcs = [];
                selectedElement.element.arcs.forEach(arc => {
                    this.canvas.remove(arc);
                    removedArcs.push(arc);
                });
                this.petriflowElements.forEach(petriflowElement => {
                    if (petriflowElement instanceof PetriflowNodeElement) {
                        petriflowElement.deleteArcs(removedArcs);
                    }
                });
                this.canvas.remove(selectedElement.element);
            }
        });
    }

    get panzoom(): PanZoom {
        return this._panzoom;
    }

    set panzoom(value: PanZoom) {
        this._panzoom = value;
    }

    getPanZoomOffset(): Transform {
        return this._panzoom.getTransform();
    }

    selectAll() {
        this.selectedElements = this.petriflowElements;
        this.selectedElements.forEach(selectedElement => selectedElement.select());
    }

    get petriflowElements(): Array<PetriflowCanvasElement<CanvasElement>> {
        return this._petriflowElements;
    }

    get selectedElements(): Array<PetriflowCanvasElement<CanvasElement>> {
        return this._selectedElements;
    }

    set selectedElements(value: Array<PetriflowCanvasElement<CanvasElement>>) {
        this._selectedElements = value;
    }

    get copiedElements(): Array<PetriflowCanvasElement<CanvasElement>> {
        return this._copiedElements;
    }

    set copiedElements(value: Array<PetriflowCanvasElement<CanvasElement>>) {
        this._copiedElements = value;
    }
}
