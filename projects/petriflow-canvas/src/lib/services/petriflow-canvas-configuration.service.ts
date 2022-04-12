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
import {PetriflowPlaceTransitionArc} from '../svg-elements/arcs/petriflow-place-transition-arc';
import {PetriflowTransitionPlaceArc} from '../svg-elements/arcs/petriflow-transition-place-arc';
import {PetriflowReadArc} from '../svg-elements/arcs/petriflow-read-arc';
import {PetriflowResetArc} from '../svg-elements/arcs/petriflow-reset-arc';
import {PetriflowInhibitorArc} from '../svg-elements/arcs/petriflow-inhibitor-arc';

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
    private _clipboardBox: DOMRect;
    private _clipboard: SVGElement;

    constructor(private _petriflowCanvasFactory: PetriflowCanvasFactoryService,
                private _petriflowCanvasService: PetriflowCanvasService) {
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
                const width = (e.x - offset.x) / offset.scale - this.mouseX;
                const height = (e.y - toolbar?._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale - this.mouseY;
                const newX = width > 0 ? this.mouseX : this.mouseX + width;
                const newY = height > 0 ? this.mouseY : this.mouseY + height;
                this.rectangle.setAttributeNS(null, 'width', `${Math.abs(width)}`);
                this.rectangle.setAttributeNS(null, 'height', `${Math.abs(height)}`);
                this.rectangle.setAttributeNS(null, 'x', `${newX}`);
                this.rectangle.setAttributeNS(null, 'y', `${newY}`);
            }
            this.onCanvasMouseMoveClipboard(e);
        };
        svg.onmousedown = (e) => {
            e.preventDefault();
            this._petriflowCanvasService.deselectAll();
            if (this.mode === CanvasMode.LASSO) {
                this.mouseDown = true;
                const offset = this._petriflowCanvasService.getPanZoomOffset();
                this.rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
                this.rectangle.setAttributeNS(null, 'fill', 'none');
                this.rectangle.setAttributeNS(null, 'class', 'path');
                this.rectangle.setAttributeNS(null, 'stroke', 'black');
                this.rectangle.setAttributeNS(null, 'stroke-width', '1');
                this.rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
                this.mouseX = (e.x - offset.x) / offset.scale;
                this.mouseY = (e.y - toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale;
                this.rectangle.setAttributeNS(null, 'x', `${this.mouseX}`);
                this.rectangle.setAttributeNS(null, 'y', `${this.mouseY}`);
                this._petriflowCanvasService.canvas.container.appendChild(this.rectangle);
            }
            this.onMouseMoveDownDestroyClipboard();
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
        svg.onmouseleave = () => {
            this.deleteClipboard();
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
            if (!transition.isSelected) {
                transition.deactivate();
            }
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
            if (!place.isSelected) {
                place.deactivate();
            }
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
                if (!place.isSelected) {
                    place.deactivate();
                }
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
            if (!arc.isSelected) {
                arc.deactivate();
            }
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

    pasteElements() {
        this.initialiseClipboard();
        this._petriflowCanvasService.copiedElements.forEach(element => {
            let newElement: CanvasElement;
            // TODO: Refactor instanceof !
            if (element instanceof PetriflowPlace) {
                newElement = this._petriflowCanvasFactory.createPlace(element.tokensCount, element.position, false);
            } else if (element instanceof PetriflowTransition) {
                newElement = this._petriflowCanvasFactory.createTransition(element.position, element.icon?.textContent ?? '', false);
            } else if (element instanceof Arc) {
                newElement = this.createArcByDeterminedType(PetriflowPlaceTransitionArc, element) ?? newElement;
                newElement = this.createArcByDeterminedType(PetriflowTransitionPlaceArc, element) ?? newElement;
                newElement = this.createArcByDeterminedType(PetriflowReadArc, element) ?? newElement;
                newElement = this.createArcByDeterminedType(PetriflowResetArc, element) ?? newElement;
                newElement = this.createArcByDeterminedType(PetriflowInhibitorArc, element) ?? newElement;
            }
            this.clipboard.appendChild(newElement.container);
            this._petriflowCanvasService.pastedElements.push(newElement);
        });
        this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);
        this._clipboardBox = this.clipboard.getBoundingClientRect();
    }

    private onMouseMoveDownDestroyClipboard() {
        if (this.clipboard && this._clipboardBox) {
            this.destroyAndReduceClipboard();
        }
    }

    private createArcByDeterminedType<T extends Arc>(type: new(start: NodeElement, end: NodeElement, linePoints?: Array<DOMPoint>, multiplicityLabel?: string) => T, element: Arc): Arc {
        if (element instanceof type) {
            const source = element.start;
            const destination = element.end;
            const startIndex = this._petriflowCanvasService.copiedElements.findIndex(startElement => {
                return source === startElement;
            });
            const endIndex = this._petriflowCanvasService.copiedElements.findIndex(endElement => {
                return destination === endElement;
            });
            return new type(this._petriflowCanvasService.pastedElements[startIndex] as NodeElement,
                this._petriflowCanvasService.pastedElements[endIndex] as NodeElement,
                element.linePoints, element.multiplicity.textContent);
        }
        return undefined;
    }

    private onCanvasMouseMoveClipboard(event: MouseEvent) {
        if (this.clipboard && this._clipboardBox) {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const mouseX = (event.x - offset.x) / offset.scale - (this._clipboardBox.x + this._clipboardBox.width / 2 - offset.x) / offset.scale;
            const mouseY = (event.y - offset.y) / offset.scale - (this._clipboardBox.y + this._clipboardBox.height / 2 - offset.y) / offset.scale;
            this.clipboard.setAttribute('transform', `matrix(1,0,0,1,${mouseX},${mouseY})`);
        }
    }

    deleteSelectedElements() {
        const toDeleteElements = [];
        this._petriflowCanvasService.selectedElements.forEach(selectedElement => {
            if (selectedElement instanceof NodeElement) {
                const removedArcs = [];
                selectedElement.arcs.forEach(arc => {
                    this._petriflowCanvasService.canvas.remove(arc);
                    removedArcs.push(arc);
                });
                this._petriflowCanvasService.petriflowElements.forEach(petriflowElement => {
                    if (petriflowElement instanceof NodeElement) {
                        petriflowElement.deleteArcs(removedArcs);
                        toDeleteElements.push(petriflowElement);
                    }
                });
                this._petriflowCanvasService.canvas.remove(selectedElement);
                toDeleteElements.push(selectedElement);
            }
        });
        toDeleteElements.forEach(element => {
            this._petriflowCanvasService.petriflowElements.splice(this._petriflowCanvasService.petriflowElements.indexOf(element));
        });
        this._petriflowCanvasService.selectedElements = [];
    }

    initialiseClipboard() {
        this.clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this.clipboard.id = 'canvas-clipboard';
    }

    destroyAndReduceClipboard() {
        const matrix = (this.clipboard as SVGSVGElement).transform.baseVal[0].matrix;
        this._petriflowCanvasService.pastedElements.forEach(copyElement => {
            if (copyElement instanceof NodeElement) {
                copyElement.moveBy(matrix.e, matrix.f);
                // TODO: instanceof away
                if (copyElement instanceof PetriflowPlace) {
                    this.addPlaceEvents(copyElement);
                } else if (copyElement instanceof PetriflowTransition) {
                    this.addTransitionEvents(copyElement);
                }
            } else if (copyElement instanceof Arc) {
                this.addArcEvents(copyElement);
            }
            this._petriflowCanvasService.canvas.add(copyElement);
            this._petriflowCanvasService.petriflowElements.push(copyElement);
        });
        this.deleteClipboard();
    }

    deleteClipboard() {
        if (this.clipboard) {
            this._petriflowCanvasService.canvas.container.removeChild(this.clipboard);
            this.clipboard = undefined;
            this._petriflowCanvasService.pastedElements = [];
        }
        if (this.rectangle) {
            this.mouseDown = false;
            this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
    }

    get clipboard(): SVGElement {
        return this._clipboard;
    }

    set clipboard(value: SVGElement) {
        this._clipboard = value;
    }
}
