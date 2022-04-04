import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PetriflowCanvasService} from '../../projects/petriflow-canvas/src/lib/petriflow-canvas.service';
import {MatToolbar} from '@angular/material/toolbar';
import {NodeElement} from '../../projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasConfiguration} from '../../projects/canvas/src/lib/canvas/canvas-configuration';
import {CanvasElement} from '../../projects/canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {PetriflowCanvasFactoryService} from '../../projects/petriflow-canvas/src/lib/factories/petriflow-canvas-factory.service';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {PetriflowNodeElement} from '../../projects/petriflow-canvas/src/lib/svg-elements/PetriflowNodeElement';

@Component({
    selector: 'nab-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    private arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];

    private _canvasMode: string;
    private _isDrawing = false;
    @ViewChild(MatToolbar) toolbar: MatToolbar;
    @ViewChild('canvasComponent') canvasComponent: ElementRef;
    private _arcLine: SVGElement;

    // SELECT logic
    private mouseDown = false;
    private mouseX = 0;
    private mouseY = 0;
    private rectangle: SVGElement;

    private _source: NodeElement;

    constructor(private _petriflowCanvasService: PetriflowCanvasService, private _petriflowFactoryService: PetriflowCanvasFactoryService) {
    }

    ngAfterViewInit(): void {
        // TODO: create custom service for events, maybe also use generic, abstraction
        this._petriflowCanvasService.canvas.svg.onclick = (e) => {
            this.addTransition(e);
            this.addPlace(e);
        };
        this._petriflowCanvasService.canvas.svg.onmousedown = (e) => {
            e.preventDefault();
            if (this.canvasMode === 'rectangle') {
                this.mouseDown = true;
                const offset = this._petriflowCanvasService.getPanZoomOffset();
                this.rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
                this.rectangle.setAttributeNS(null, 'fill', 'none');
                this.rectangle.setAttributeNS(null, 'class', 'path');
                this.rectangle.setAttributeNS(null, 'stroke', 'black');
                this.rectangle.setAttributeNS(null, 'stroke-width', '2');
                this.rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
                this.mouseX = (e.x - offset.x) / offset.scale;
                this.mouseY = (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale;
                this.rectangle.setAttributeNS(null, 'x', `${this.mouseX}`);
                this.rectangle.setAttributeNS(null, 'y', `${this.mouseY}`);
                this._petriflowCanvasService.canvas.container.appendChild(this.rectangle);
            }
        };
        this._petriflowCanvasService.canvas.svg.onmouseup = () => {
            if (this.canvasMode === 'rectangle') {
                if (this.rectangle) {
                    this._petriflowCanvasService.selectedElements = this._petriflowCanvasService.getEnclosedElementsByRectangle(this.rectangle);
                    this._petriflowCanvasService.selectedElements.forEach(selectedElement => selectedElement.select());
                }
                this.mouseDown = false;
                this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
                this.rectangle = undefined;
            }
        };
        this._petriflowCanvasService.canvas.svg.onmousemove = (e) => {
            this.moveArc(e);
            this.moveElement(e);
            if (this.mouseDown && this.canvasMode === 'rectangle') {
                this._petriflowCanvasService.canvas.svg.deselectAll();
                const offset = this._petriflowCanvasService.getPanZoomOffset();
                this.rectangle.setAttributeNS(null, 'width', `${Math.abs((e.x - offset.x) / offset.scale - this.mouseX)}`);
                this.rectangle.setAttributeNS(null, 'height', `${Math.abs((e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale - this.mouseY)}`);
            }
        };
    }

    private addTransition($event): void {
        if (this.transitionMode === 'transition') {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const transition = this._petriflowFactoryService.createTransition(new DOMPoint(($event.x - offset.x) / offset.scale,
                ($event.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale));
            transition.element.onclick = (e) => {
                this.addArc(transition);
                this.selectElement(transition);
                this.deleteElement(transition);
            };
            transition.element.onmouseenter = () => {
                transition.activate();
            };
            transition.element.onmouseleave = () => {
                transition.deactivate();
            };
        }
    }

    private addPlace(e: MouseEvent) {
        if (this.transitionMode === 'place') {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const place = this._petriflowFactoryService.createPlace(0, new DOMPoint((e.x - offset.x) / offset.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale));
            place.element.onclick = () => {
                this.addArc(place);
                this.selectElement(place);
                this.deleteElement(place);
            };

            place.element.onmouseenter = () => {
                place.activate();
            };
            place.element.onmouseleave = () => {
                place.deactivate();
            };
            // TODO: add to some abstract event listener class, for canvas elements
            place.markingTokens.forEach(markingToken => {
                markingToken.onclick = () => {
                    this.addArc(place);
                    this.selectElement(place);
                    this.deleteElement(place);
                };
                markingToken.onmouseenter = () => {
                    place.activate();
                };
                markingToken.onmouseleave = () => {
                    place.deactivate();
                };
            });
        }
    }

    private addArc(element: NodeElement) {
        if (!this._arcLine && this.arcTypes.includes(this.transitionMode)) {
            this._source = element;
            this._arcLine = this._petriflowFactoryService.addArc(element, this.transitionMode) as SVGElement;
        } else if (this._arcLine) {
            const arc = this._petriflowFactoryService.addArc(element, this.transitionMode) as Arc;
            this._source = undefined;
            this._arcLine = undefined;
            arc.arcLine.onclick = () => {
                this.deleteElement(arc);
            };
            arc.arcLine.onmouseenter = () => {
                arc.activate();
            };
            arc.arcLine.onmouseleave = () => {
                arc.deactivate();
            };
        }
    }

    private moveArc(e: MouseEvent) {
        if (this._arcLine) {
            const offsetPanZoom = this._petriflowCanvasService.getPanZoomOffset();
            const intersect = this._source.getEdgeIntersection(new DOMPoint((e.x - offsetPanZoom.x) / offsetPanZoom.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale), 0);
            const xLineLength = ((e.x - offsetPanZoom.x) / offsetPanZoom.scale) - intersect.x;
            const yLineLength = ((e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale) - intersect.y;
            const arcLength = Math.sqrt(xLineLength * xLineLength + yLineLength * yLineLength);
            const arcLengthOffset = arcLength - CanvasConfiguration.ARROW_HEAD_SIZE;
            const arcRatio = arcLengthOffset / arcLength;
            const finalX = intersect.x + xLineLength * arcRatio;
            const finalY = intersect.y + yLineLength * arcRatio;
            this._arcLine.setAttributeNS(null, 'points', `${intersect.x},${intersect.y} ${finalX},${finalY}`);
        }
    }

    get transitionMode(): string {
        return this._canvasMode;
    }

    set canvasMode(value: string) {
        this._canvasMode = value;
    }

    get canvasMode(): string {
        return this._canvasMode;
    }

    get isDrawing(): boolean {
        return this._isDrawing;
    }

    set isDrawing(value: boolean) {
        this._isDrawing = value;
    }

    private selectElement(element: NodeElement) {
        if (this._canvasMode === 'move') {
            if (!this._source) {
                this._source = element;
            } else {
                this._source = undefined;
            }
        }
    }

    private moveElement(e: MouseEvent) {
        if (this.transitionMode === 'move' && this._source) {
            const offsetPanZoom = this._petriflowCanvasService.getPanZoomOffset();
            this._source.move(new DOMPoint((e.x - offsetPanZoom.x) / offsetPanZoom.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale));
        }
    }

    private deleteElement(element: CanvasElement) {
        if (this._canvasMode === 'remove') {
            if (element instanceof NodeElement) {
                const removedArcs = [];
                element.arcs.forEach(arc => {
                        this._petriflowCanvasService.canvas.remove(arc);
                        removedArcs.push(arc);
                    }
                );
                this._petriflowCanvasService.petriflowElements.forEach(petriflowElement => {
                    if (petriflowElement instanceof PetriflowNodeElement) {
                        petriflowElement.deleteArcs(removedArcs);
                    }
                });
            }
            this._petriflowCanvasService.canvas.remove(element);
        }
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }

    changeCanvasMode(mode: string, panzoomEnabled = true, cursor?: string) {
        this.disablePreviousArcMode();
        this.canvasMode = mode;
        if (panzoomEnabled && this._petriflowCanvasService.panzoom.isPaused()) {
            this._petriflowCanvasService.panzoom.resume();
        } else if (!panzoomEnabled && !this._petriflowCanvasService.panzoom.isPaused()) {
            this._petriflowCanvasService.panzoom.pause();
        }
    }

    disablePreviousArcMode() {
        if (this._petriflowFactoryService.arcLine) {
            this._petriflowCanvasService.canvas.container.removeChild(this._petriflowFactoryService.arcLine);
            this._source = undefined;
            this._petriflowFactoryService.arcLine = undefined;
        }
    }
}
