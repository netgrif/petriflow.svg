import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowCanvasFactoryService} from '../factories/petriflow-canvas-factory.service';
import {CanvasMode} from '../canvas-mode';
import {Arc, CanvasConfiguration, NodeElement} from '@netgrif/petri.svg';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {MatToolbar} from '@angular/material/toolbar';
import {CanvasElementCollection} from '../domain/canvas-element-collection';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowArc} from '../svg-elements/petriflow-arc';
import {PetriflowCanvasElement} from '../svg-elements/petriflow-canvas-element';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasConfigurationService {

    private arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];

    private _mode: CanvasMode | undefined;
    private _arcLine: SVGElement | undefined;
    private mouseDown = false;
    private mouseX = 0;
    private mouseY = 0;
    private rectangle: SVGElement | undefined;
    private _source: PetriflowNode<NodeElement> | undefined;
    private _toolbar: MatToolbar | undefined;
    private _clipboardBox: DOMRect | undefined;
    private _clipboard: SVGElement | undefined;

    private _breakpoint: DOMPoint;
    private _selectedArc: PetriflowArc<Arc> | undefined;

    constructor(private _petriflowCanvasFactory: PetriflowCanvasFactoryService,
                private _petriflowCanvasService: PetriflowCanvasService) {
        this._breakpoint = new DOMPoint();
    }

    get mode(): CanvasMode | undefined {
        return this._mode;
    }

    set mode(value: CanvasMode | undefined) {
        this._mode = value;
    }

    get toolbar(): MatToolbar | undefined {
        return this._toolbar;
    }

    addCanvasEvent(svg: SVGGElement, toolbar: MatToolbar) {
        this._toolbar = toolbar;
        svg.onmousemove = (e) => {
            if (this._arcLine) {
                this.moveArc(e);
            }
            this.moveElement(e);
            this.moveBreakpoint(e);
            if (this.mouseDown && this.mode === CanvasMode.LASSO) {
                if (!this._petriflowCanvasService.canvas) {
                    throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
                }
                this._petriflowCanvasService.deselectAll();
                this._petriflowCanvasService.canvas.svg.deselectAll();
                const width = e.offsetX - this.mouseX;
                const height = e.offsetY - this.mouseY;
                const newX = width > 0 ? this.mouseX : this.mouseX + width;
                const newY = height > 0 ? this.mouseY : this.mouseY + height;
                if (!this.rectangle) {
                    throw new Error('SVGElement is not set');
                }
                this.rectangle.setAttributeNS(null, 'width', `${Math.abs(width)}`);
                this.rectangle.setAttributeNS(null, 'height', `${Math.abs(height)}`);
                this.rectangle.setAttributeNS(null, 'x', `${newX}`);
                this.rectangle.setAttributeNS(null, 'y', `${newY}`);
            }
            this.onCanvasMouseMoveClipboard(e);
        };
        svg.onmousedown = (e) => {
            e.preventDefault();
            if (this.mode === CanvasMode.LASSO) {
                this._petriflowCanvasService.deselectAll();
                this.mouseDown = true;
                this.rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
                this.rectangle.setAttributeNS(null, 'fill', 'none');
                this.rectangle.setAttributeNS(null, 'class', 'path');
                this.rectangle.setAttributeNS(null, 'stroke', 'black');
                this.rectangle.setAttributeNS(null, 'stroke-width', '1');
                this.rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
                this.mouseX = e.offsetX;
                this.mouseY = e.offsetY;
                this.rectangle.setAttributeNS(null, 'x', `${this.mouseX}`);
                this.rectangle.setAttributeNS(null, 'y', `${this.mouseY}`);
                if (!this._petriflowCanvasService.canvas) {
                    throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
                }
                this._petriflowCanvasService.canvas.container.appendChild(this.rectangle);
            }
            this.onMouseMoveDownDestroyClipboard();
        };
        svg.onmouseup = (e) => {
            e.preventDefault();
            if (this.mode === CanvasMode.LASSO && this.rectangle) {
                this._petriflowCanvasService.setSelectedByRectangleEnclosure(this.rectangle);
                this.mouseDown = false;
                if (!this._petriflowCanvasService.canvas) {
                    throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
                }
                this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
                this.rectangle = undefined;
            }
        };
        svg.onmouseleave = () => {
            this.deleteClipboard();
        };
    }

    // Transition Events
    addTransitionEvents(petriflowTransition: PetriflowTransition): void {
        petriflowTransition.setOnClick((element) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>);
        });
    }

    // Place Events
    addPlaceEvents(petriflowPlace: PetriflowPlace): void {
        petriflowPlace.setOnClick((element) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>);
        });
        petriflowPlace.setOnTokenClickEvent((element) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>);
        });
    }

    private attachCanvasElementOnClickFunctions(element: PetriflowNode<NodeElement>) {
        this.addArc(element);
        this.selectElement(element);
        this.deleteElement(element);
        this.multipleSelectElement(element);
    }

    // Arc Events
    addArcEvents(arc: PetriflowArc<Arc>) {
        arc.setOnClick((element, e) => {
            this.deleteArc(element as PetriflowArc<Arc>);
            this.createBreakpoint(e as MouseEvent, element as PetriflowArc<Arc>);
            this.multipleSelectElement(element);
        });
    }

    private addArc(element: PetriflowNode<NodeElement>) {
        if (!this._arcLine && this.arcTypes.includes(this._mode as string)) {
            this._source = element;
            this._petriflowCanvasFactory.source = element;
            this._arcLine = this._petriflowCanvasFactory.addArc(element, this._mode as string) as SVGElement;
        } else if (this._arcLine) {
            const arc = this._petriflowCanvasFactory.addArc(element, this._mode as string) as PetriflowArc<Arc>;
            if (arc) {
                this._source = undefined;
                this._arcLine = undefined;
                this.addArcEvents(arc);
            }
        }
    }

    private selectElement(element: PetriflowNode<NodeElement>) {
        if (this._mode === CanvasMode.MOVE) {
            if (!this._petriflowCanvasFactory.source && this._petriflowCanvasService.petriflowElementsCollection.selected.length === 0) {
                this._petriflowCanvasFactory.source = element;
            } else {
                this._petriflowCanvasFactory.source = undefined;
            }
        }
    }

    private multipleSelectElement(element: PetriflowCanvasElement) {
        if (this._mode === CanvasMode.MOVE) {
            if (this._petriflowCanvasService.petriflowElementsCollection.selected.length > 1 &&
                this._petriflowCanvasService.petriflowElementsCollection.selected.includes(element as PetriflowNode<NodeElement>)) {
                this.initialiseClipboard();
                this._petriflowCanvasService.petriflowElementsCollection.selected.forEach(selectedElement => {
                    this.clipboard?.appendChild(selectedElement.canvasElement.container);
                });
                this._petriflowCanvasService.petriflowElementsCollection.arcs.filter(arc => arc.isSelected()).forEach(selectedElement => {
                    this.clipboard?.appendChild(selectedElement.element.container);
                });
                if (!this._petriflowCanvasService.canvas) {
                    throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
                }
                if (this.clipboard) {
                    this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);
                    this._clipboardBox = this.clipboard.getBoundingClientRect();
                }
            }
        }
    }

    private moveElement(e: MouseEvent) {
        if (this._mode === CanvasMode.MOVE && this._petriflowCanvasFactory.source && !this.clipboard) {
            this._petriflowCanvasFactory.source.canvasElement.move(new DOMPoint(e.offsetX, e.offsetY));
        }
    }

    private moveArc(e: MouseEvent) {
        if (!this._source) {
            return;
        }
        const intersect = this._source.canvasElement.getEdgeIntersection(new DOMPoint(e.offsetX, e.offsetY), 0);
        const xLineLength = e.offsetX - intersect.x;
        const yLineLength = e.offsetY - intersect.y;
        const arcLength = Math.sqrt(xLineLength * xLineLength + yLineLength * yLineLength);
        const arcLengthOffset = arcLength - CanvasConfiguration.ARROW_HEAD_SIZE;
        const arcRatio = arcLengthOffset / arcLength;
        const finalX = intersect.x + xLineLength * arcRatio;
        const finalY = intersect.y + yLineLength * arcRatio;
        if (!this._arcLine) {
            throw new Error('Arc line is not set!');
        }
        this._arcLine.setAttributeNS(null, 'points', `${intersect.x},${intersect.y} ${finalX},${finalY}`);
    }

    private deleteElement(element: PetriflowNode<NodeElement>) {
        if (this._mode === CanvasMode.REMOVE) {
            const removedArcs: Array<Arc> = [];
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            element.canvasElement.arcs.forEach(arc => {
                    this._petriflowCanvasService?.canvas?.remove(arc);
                    removedArcs.push(arc);
                }
            );
            this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(petriflowElement => {
                petriflowElement.canvasElement.deleteArcs(removedArcs);
            });
            this._petriflowCanvasService.canvas.remove(element.canvasElement);
        }
    }

    private deleteArc(petriflowElement: PetriflowArc<Arc>) {
        if (this._mode === CanvasMode.REMOVE) {
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.remove(petriflowElement.element);
        }
    }

    pasteElements() {
        this.initialiseClipboard();

        let clipboardContent = [...this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes];
        this.pasteElementsFromCollection(this._petriflowCanvasService.petriflowClipboardElementsCollection.places);
        this.pasteElementsFromCollection(this._petriflowCanvasService.petriflowClipboardElementsCollection.transitions);

        const arcsCollection = this._petriflowCanvasService.petriflowClipboardElementsCollection.arcs;
        const length = arcsCollection.length;
        arcsCollection.forEach(element => {
            const newElement = this.createArcByDeterminedType(element, clipboardContent);
            this.clipboard?.appendChild(newElement.element.container);
            arcsCollection.push(newElement);
        });
        arcsCollection.splice(0, length);
        if (!this._petriflowCanvasService.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        clipboardContent = [];
        if (this.clipboard) {
            this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);
            this._clipboardBox = this.clipboard?.getBoundingClientRect();
        }
    }

    private pasteElementsFromCollection(collection: Array<PetriflowNode<NodeElement>>) {
        const length = collection.length;
        collection.forEach(element => {
            const newElement = element.clone();
            this.clipboard?.appendChild(newElement.canvasElement.container);
            collection.push(newElement);
        });
        collection.splice(0, length);
    }

    private onMouseMoveDownDestroyClipboard() {
        if (this.clipboard && this._clipboardBox && this.mode === CanvasMode.LASSO) {
            this.destroyAndReduceClipboard();
        } else if (this.clipboard && this._clipboardBox && this.mode === CanvasMode.MOVE) {
            this.destroyAndMoveElements();
        }
    }

    private createArcByDeterminedType(petriflowArc: PetriflowArc<Arc>, clipboardContent: Array<PetriflowNode<NodeElement>>): PetriflowArc<Arc> {
        const source = petriflowArc.element.start;
        const destination = petriflowArc.element.end;
        const startIndex = clipboardContent.findIndex(startElement => {
            return source.container === startElement.canvasElement.container;
        });
        const endIndex = clipboardContent.findIndex(endElement => {
            return destination.container === endElement.canvasElement.container;
        });
        return petriflowArc.cloneArc(this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[startIndex].canvasElement,
            this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[endIndex].canvasElement);
    }

    private onCanvasMouseMoveClipboard(event: MouseEvent) {
        if (this.clipboard && this._clipboardBox) {
            const x = this._petriflowCanvasService.xOffset;
            const y = this._petriflowCanvasService.yOffset;
            const scale = this._petriflowCanvasService.scale;
            const mouseX = (event.x - (x ?? 0)) / (scale ?? 1) - (this._clipboardBox.x + this._clipboardBox.width / 2 - (x ?? 0)) / (scale ?? 1);
            const mouseY = (event.y - (y ?? 0)) / (scale ?? 1) - (this._clipboardBox.y + this._clipboardBox.height / 2 - (y ?? 0)) / (scale ?? 1);
            this.clipboard.setAttribute('transform', `matrix(1,0,0,1,${mouseX},${mouseY})`);
        }
    }

    deleteSelectedElements() {
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.places);
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.transitions);
    }

    deleteSelectedCollection(collection: Array<PetriflowNode<NodeElement>>) {
        let removedArcs: Array<Arc> = [];
        collection.filter(element => element.isSelected()).forEach(selectedElement => {
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            selectedElement.canvasElement.arcs.forEach(arc => {
                this._petriflowCanvasService?.canvas?.remove(arc);
                removedArcs.push(arc);
            });
            this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(petriflowElement => petriflowElement.canvasElement.deleteArcs(removedArcs));
            removedArcs.forEach(arc => {
                this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(
                    this._petriflowCanvasService.petriflowElementsCollection.arcs.findIndex(petriflowArc => petriflowArc.element === arc), 1);
            });
            removedArcs = [];
            this._petriflowCanvasService.canvas.remove(selectedElement.canvasElement);
            collection.splice(collection.indexOf(selectedElement), 1);
        });
    }

    initialiseClipboard() {
        this.clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this.clipboard.id = 'petri-svg-clipboard';
    }

    destroyAndReduceClipboard() {
        const matrix = (this.clipboard as SVGSVGElement).transform?.baseVal[0]?.matrix;
        this.copyFromClipboardToCollection(matrix, this._petriflowCanvasService.petriflowClipboardElementsCollection.places,
            this._petriflowCanvasService.petriflowElementsCollection.places);
        this.copyFromClipboardToCollection(matrix, this._petriflowCanvasService.petriflowClipboardElementsCollection.transitions,
            this._petriflowCanvasService.petriflowElementsCollection.transitions);
        this._petriflowCanvasService.petriflowClipboardElementsCollection.arcs.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.container.appendChild(copyElement.element.container);
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(copyElement);
        });
        this.deleteClipboard();
    }

    private copyFromClipboardToCollection(matrix: SVGMatrix, collectionFrom: Array<PetriflowNode<NodeElement>>, collectionTo: Array<PetriflowNode<NodeElement>>) {
        collectionFrom.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.add(copyElement.canvasElement);
            collectionTo.push(copyElement);
        });
    }

    destroyAndMoveElements() {
        const matrix = (this.clipboard as SVGSVGElement).transform?.baseVal[0]?.matrix;
        this._petriflowCanvasService.petriflowElementsCollection.selected.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.add(copyElement.canvasElement);
        });
        this._petriflowCanvasService.petriflowElementsCollection.arcs.filter(arc => arc.isSelected()).forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.container.appendChild(copyElement.element.container);
        });
        this.deleteClipboard();
    }

    deleteClipboard() {
        if (!this._petriflowCanvasService.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        if (this.clipboard) {
            this._petriflowCanvasService.canvas.container.removeChild(this.clipboard);
            this.clipboard = undefined;
            this._petriflowCanvasService.petriflowClipboardElementsCollection = new CanvasElementCollection();
        }
        if (this.rectangle) {
            this.mouseDown = false;
            this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
        if (this._arcLine) {
            this._petriflowCanvasService.canvas.container.removeChild(this._arcLine);
            this._petriflowCanvasFactory.arcLine = undefined;
            this._arcLine = undefined;
            this.mouseDown = false;
        }
    }

    get clipboard(): SVGElement | undefined {
        return this._clipboard;
    }

    set clipboard(value: SVGElement | undefined) {
        this._clipboard = value;
    }

    private createBreakpoint(e: MouseEvent, arc: PetriflowArc<Arc>) {
        if (this.mode === CanvasMode.MOVE && !this._selectedArc) {
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            const newBreakpoint = new DOMPoint(mouseX, mouseY);
            arc.element.linePoints.splice(this.getBreakpointIndex(newBreakpoint, arc.element), 0, newBreakpoint);
            arc.element.move(arc.element.start, arc.element.end);
            this._breakpoint = newBreakpoint;
            this._selectedArc = arc;
        } else if (this.mode === CanvasMode.MOVE && this._selectedArc) {
            this._breakpoint = new DOMPoint();
            this._selectedArc = undefined;
        }
    }

    private getBreakpointIndex(newBreakpoint: DOMPoint, arc: Arc): number {
        const arcPoints = [...arc.linePoints, arc.end.position];
        const arcPointsLength = arcPoints.length;
        if (arcPointsLength) {
            for (let i = 0; i < arcPointsLength - 1; i++) {
                const breakpointOffset = this.getDistanceBetweenPoints(arcPoints[i], arcPoints[i + 1])
                    - (this.getDistanceBetweenPoints(arcPoints[i], newBreakpoint)
                        + this.getDistanceBetweenPoints(newBreakpoint, arcPoints[i + 1]));
                if (Math.abs(breakpointOffset) <= 2) {
                    return i + 1;
                }
            }
        }
        return 0;
    }

    private getDistanceBetweenPoints(pointStart: DOMPoint, pointEnd: DOMPoint): number {
        return Math.sqrt(Math.pow(pointEnd.x - pointStart.x, 2) + Math.pow(pointEnd.y - pointStart.y, 2));
    }

    private moveBreakpoint(e: MouseEvent) {
        if (this.mode === CanvasMode.MOVE && this._breakpoint) {
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            this._breakpoint.x = mouseX;
            this._breakpoint.y = mouseY;
            this._selectedArc?.element.move(this._selectedArc.element.start, this._selectedArc.element.end);
        }
    }
}
