import {Injectable} from '@angular/core';
import {Canvas} from '../../../canvas/src/lib/canvas/canvas';

@Injectable({
    providedIn: 'root',
})
export class PetriflowCanvasService {

    private _canvas: Canvas;

    constructor() {
    }

    get canvas(): Canvas {
        return this._canvas;
    }

    set canvas(value: Canvas) {
        this._canvas = value;
    }
}
