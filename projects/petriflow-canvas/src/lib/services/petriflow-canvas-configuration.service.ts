import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowCanvasFactoryService} from '../factories/petriflow-canvas-factory.service';
import {CanvasMode} from '../canvas-mode';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {MatToolbar} from '@angular/material/toolbar';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasConfigurationService {

    private arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];

    private _mode: CanvasMode;
    private _arcLine: SVGElement;
    private mouseDown = false;
    private mouseX = 0;
    private mouseY = 0;
    private rectangle: SVGElement;
    private _source: NodeElement;
    private _toolbar: MatToolbar;

    constructor(private _petriflowCanvasService: PetriflowCanvasService, private _petriflowCanvasFactory: PetriflowCanvasFactoryService) {
    }

    get mode(): CanvasMode {
        return this._mode;
    }

    set mode(value: CanvasMode) {
        this._mode = value;
    }

    addCanvasEvent(svg: SVGGElement, toolbar: MatToolbar) {
        this._toolbar = toolbar;
        svg.onmousemove = (e) => {
            if (this._arcLine) {
                this.moveArc(e);
            }
            this.moveElement(e);
            if (this.mouseDown && this.mode === CanvasMode.LASSO) {
                this._petriflowCanvasService.canvas.svg.deselectAll();
                const offset = this._petriflowCanvasService.getPanZoomOffset();
                this.rectangle.setAttributeNS(null, 'width', `${Math.abs((e.x - offset.x) / offset.scale - this.mouseX)}`);
                this.rectangle.setAttributeNS(null, 'height', `${Math.abs((e.y - toolbar?._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale - this.mouseY)}`);
            }
        };
        svg.onmousedown = (e) => {
            e.preventDefault();
            if (this.mode === CanvasMode.LASSO) {
                this.mouseDown = true;
                const offset = this._petriflowCanvasService.getPanZoomOffset();
                this.rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
                this.rectangle.setAttributeNS(null, 'fill', 'none');
                this.rectangle.setAttributeNS(null, 'class', 'path');
                this.rectangle.setAttributeNS(null, 'stroke', 'black');
                this.rectangle.setAttributeNS(null, 'stroke-width', '2');
                this.rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
                this.mouseX = (e.x - offset.x) / offset.scale;
                this.mouseY = (e.y - toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale;
                this.rectangle.setAttributeNS(null, 'x', `${this.mouseX}`);
                this.rectangle.setAttributeNS(null, 'y', `${this.mouseY}`);
                this._petriflowCanvasService.canvas.container.appendChild(this.rectangle);
            }
        };
        svg.onmouseup = (e) => {
            e.preventDefault();
            if (this.mode === CanvasMode.LASSO && this.rectangle) {
                this._petriflowCanvasService.selectedElements = this._petriflowCanvasService.getEnclosedElementsByRectangle(this.rectangle);
                this._petriflowCanvasService.selectedElements.forEach(selectedElement => selectedElement.activate());
                this.mouseDown = false;
                this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
                this.rectangle = undefined;
            }
        };
    }

    // Transition Events
    addTransitionEvents(transition: PetriflowTransition): void {
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

    // Place Events
    addPlaceEvents(place: PetriflowPlace): void {
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
        });
    }
    // Arc Events
    addArcEvents(arc: Arc) {
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

    private addArc(element: NodeElement) {
        if (!this._arcLine && this.arcTypes.includes(this._mode)) {
            this._source = element;
            this._petriflowCanvasFactory.source = element;
            this._arcLine = this._petriflowCanvasFactory.addArc(element, this._mode) as SVGElement;
        } else if (this._arcLine) {
            const arc = this._petriflowCanvasFactory.addArc(element, this._mode) as Arc;
            if (arc) {
                this._source = undefined;
                this._arcLine = undefined;
                this.addArcEvents(arc);
            }
        }
    }

    private selectElement(element: NodeElement) {
        if (this._mode === CanvasMode.MOVE) {
            if (!this._petriflowCanvasFactory.source) {
                this._petriflowCanvasFactory.source = element;
            } else {
                this._petriflowCanvasFactory.source = undefined;
            }
        }
    }

    private moveElement(e: MouseEvent) {
        if (this._mode === CanvasMode.MOVE && this._petriflowCanvasFactory.source) {
            const offsetPanZoom = this._petriflowCanvasService.getPanZoomOffset();
            this._petriflowCanvasFactory.source.move(new DOMPoint((e.x - offsetPanZoom.x) / offsetPanZoom.scale, (e.y - this._toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale));
        }
    }

    private moveArc(e: MouseEvent) {
        const offsetPanZoom = this._petriflowCanvasService.getPanZoomOffset();
        const intersect = this._source.getEdgeIntersection(new DOMPoint((e.x - offsetPanZoom.x) / offsetPanZoom.scale, (e.y - this._toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale), 0);
        const xLineLength = ((e.x - offsetPanZoom.x) / offsetPanZoom.scale) - intersect.x;
        const yLineLength = ((e.y - this._toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale) - intersect.y;
        const arcLength = Math.sqrt(xLineLength * xLineLength + yLineLength * yLineLength);
        const arcLengthOffset = arcLength - CanvasConfiguration.ARROW_HEAD_SIZE;
        const arcRatio = arcLengthOffset / arcLength;
        const finalX = intersect.x + xLineLength * arcRatio;
        const finalY = intersect.y + yLineLength * arcRatio;
        this._arcLine.setAttributeNS(null, 'points', `${intersect.x},${intersect.y} ${finalX},${finalY}`);
    }

    private deleteElement(element: CanvasElement) {
        if (this._mode === CanvasMode.REMOVE) {
            if (element instanceof NodeElement) {
                const removedArcs = [];
                element.arcs.forEach(arc => {
                        this._petriflowCanvasService.canvas.remove(arc);
                        removedArcs.push(arc);
                    }
                );
                this._petriflowCanvasService.petriflowElements.forEach(petriflowElement => {
                    if (petriflowElement instanceof NodeElement) {
                        petriflowElement.deleteArcs(removedArcs);
                    }
                });
            }
            this._petriflowCanvasService.canvas.remove(element);
        }
    }
}
