import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import {PetriflowCanvas} from '../../../canvas/src/lib/canvas/petriflow-canvas';
import {PetriflowNodeElement} from './svg-elements/PetriflowNodeElement';

@Component({
    selector: 'lib-petriflow-canvas',
    templateUrl: './petriflow-canvas.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef;
    private _canvas: PetriflowCanvas;

    constructor(private _canvasService: PetriflowCanvasService) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement.nativeElement);
        this._canvasService.canvas = this._canvas;
    }

    get canvas(): PetriflowCanvas {
        return this._canvas;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown($event: KeyboardEvent) {
        if (($event.ctrlKey || $event.metaKey)) {
            $event.preventDefault();
            if ($event.key === 'd' || $event.key === 'D') {
                console.log('on ctrl d');
            } else if ($event.key === 'c' || $event.key === 'C') {
                console.log('on ctrl c');
            } else if ($event.key === 'v' || $event.key === 'V') {
                console.log('on ctrl v');
            } else if ($event.key === 'a' || $event.key === 'A') {
                console.log('on ctrl a');
            } else if ($event.key === 'z' || $event.key === 'Z') {
                console.log('on ctrl z');
            //    TODO: undo/redo by memento ?
            }
        }
    }

    @HostListener('keydown.delete', ['$event'])
    onDelete() {
        this._canvasService.petriflowElements.filter(canvasElement => canvasElement.isSelected).forEach(selectedElement => {
            if (selectedElement instanceof PetriflowNodeElement) {
                selectedElement.element.arcs.forEach(arc => {
                    this._canvasService.canvas.remove(arc);
                });
                this._canvasService.canvas.remove(selectedElement.element);
            }
        });
    }
}
