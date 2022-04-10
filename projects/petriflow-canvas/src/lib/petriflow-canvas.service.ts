import {Injectable} from '@angular/core';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';
import {CanvasConfiguration} from '../../../canvas/src/lib/canvas/canvas-configuration';
import {PanZoom, Transform} from 'panzoom';
import {NodeElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import { Arc } from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: PetriflowCanvas;
    private _clipboard: SVGElement;
    private _petriflowElements: Array<CanvasElement>;
    private _selectedElements: Array<CanvasElement>;
    private _copiedElements: Array<CanvasElement>;
    private _pastedElements: Array<CanvasElement>;
    private _panzoom: PanZoom;

    constructor() {
        this._petriflowElements = [];
        this._selectedElements = [];
        this._copiedElements = [];
        this._pastedElements = [];
    }

    initialiseClipboard() {
        this._clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this._clipboard.id = 'canvas-clipboard';
    }

    destroyClipboard() {
        const matrix = (this.clipboard as SVGSVGElement).transform.baseVal[0].matrix;
        this._pastedElements.forEach(copyElement => {
            if (copyElement instanceof NodeElement) {
                copyElement.moveBy(matrix.e, matrix.f);
                copyElement.arcs = [];
            } else if (copyElement instanceof Arc) {
                // TODO: refactor this later
                const source = copyElement.start;
                const destination = copyElement.end;
                const startIndex = this._copiedElements.findIndex(startElement => {
                    return source === startElement;
                });
                const endIndex = this._copiedElements.findIndex(endElement => {
                    return destination === endElement;
                });
                copyElement.start = this._pastedElements[startIndex] as NodeElement;
                copyElement.end = this._pastedElements[endIndex] as NodeElement;
                (this._pastedElements[startIndex] as NodeElement).arcs.push(copyElement);
                (this._pastedElements[endIndex] as NodeElement).arcs.push(copyElement);
                (this._pastedElements[startIndex] as NodeElement).moveBy(0, 0);
            }
            this.canvas.container.appendChild(copyElement.container);
            this.petriflowElements.push(copyElement);
        });
        this.canvas.container.removeChild(this.clipboard);
        this.clipboard = undefined;
        this._pastedElements = [];
    }

    getEnclosedElementsByRectangle(rectangle: SVGElement): Array<CanvasElement> {
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
            const copyObject = element.clone();
            this.clipboard.appendChild(copyObject.container);
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
            if (selectedElement instanceof NodeElement) {
                const removedArcs = [];
                selectedElement.arcs.forEach(arc => {
                    this.canvas.remove(arc);
                    removedArcs.push(arc);
                });
                this.petriflowElements.forEach(petriflowElement => {
                    if (petriflowElement instanceof NodeElement) {
                        petriflowElement.deleteArcs(removedArcs);
                    }
                });
                this.canvas.remove(selectedElement);
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
        this.selectedElements.forEach(selectedElement => selectedElement.activate());
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

    get petriflowElements(): Array<CanvasElement> {
        return this._petriflowElements;
    }

    set petriflowElements(value: Array<CanvasElement>) {
        this._petriflowElements = value;
    }

    get selectedElements(): Array<CanvasElement> {
        return this._selectedElements;
    }

    set selectedElements(value: Array<CanvasElement>) {
        this._selectedElements = value;
    }

    get copiedElements(): Array<CanvasElement> {
        return this._copiedElements;
    }

    set copiedElements(value: Array<CanvasElement>) {
        this._copiedElements = value;
    }

    get pastedElements(): Array<CanvasElement> {
        return this._pastedElements;
    }

    set pastedElements(value: Array<CanvasElement>) {
        this._pastedElements = value;
    }
}
