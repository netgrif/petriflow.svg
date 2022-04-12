import {Injectable} from '@angular/core';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';
import {PanZoom, Transform} from 'panzoom';
import {CanvasElement} from '../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: PetriflowCanvas;
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

    getEnclosedElementsByRectangle(rectangle: SVGElement): Array<CanvasElement> {
        const newRect = this.canvas.svg.createSVGRect();
        newRect.x = +rectangle.getAttribute('x');
        newRect.y = +rectangle.getAttribute('y');
        newRect.width = +rectangle.getAttribute('width');
        newRect.height = +rectangle.getAttribute('height');
        return this._petriflowElements.filter(petriflowElement => petriflowElement.isEnclosedByRectangle(newRect));
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

    copyElements() {
        this.copiedElements = this.selectedElements;
    }

    selectAll() {
        this.selectedElements = this.petriflowElements;
        this.selectedElements.forEach(selectedElement => selectedElement.activate());
    }

    deselectAll() {
        this.selectedElements.forEach(selectedElement => selectedElement.deactivate());
        this.selectedElements = [];
    }

    get canvas(): PetriflowCanvas {
        return this._canvas;
    }

    set canvas(value: PetriflowCanvas) {
        this._canvas = value;
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
