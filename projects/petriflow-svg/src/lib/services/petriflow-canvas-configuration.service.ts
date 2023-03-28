import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {CanvasMode} from '../canvas-mode';
import {
    Arc,
    CanvasConfiguration,
    InhibitorArc,
    NodeElement,
    Place, ReadArc,
    RegularPlaceTransitionArc, RegularTransitionPlaceArc,
    ResetArc
} from '@netgrif/petri.svg';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowArc} from '../svg-elements/petriflow-arc';
import {PetriflowCanvasElement} from '../svg-elements/petriflow-canvas-element';
import {PetriflowPlaceTransitionArc} from "../svg-elements/arcs/petriflow-place-transition-arc";
import {PetriflowResetArc} from "../svg-elements/arcs/petriflow-reset-arc";
import {PetriflowInhibitorArc} from "../svg-elements/arcs/petriflow-inhibitor-arc";
import {PetriflowReadArc} from "../svg-elements/arcs/petriflow-read-arc";
import {PetriflowTransitionPlaceArc} from "../svg-elements/arcs/petriflow-transition-place-arc";

@Injectable({
    providedIn: 'root'
})
export abstract class PetriflowCanvasConfigurationService {

    private arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];

    protected _mode: CanvasMode | undefined;
    protected _arcLine: SVGElement | undefined;
    protected _source: PetriflowNode<NodeElement> | undefined;
    protected mouseDown = false;
    private mouseX = 0;
    private mouseY = 0;
    protected rectangle: SVGElement | undefined;

    private _breakpoint: DOMPoint;
    private _selectedArc: PetriflowArc<Arc> | undefined;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
        this._breakpoint = new DOMPoint();
    }

    get mode(): CanvasMode | undefined {
        return this._mode;
    }

    set mode(value: CanvasMode | undefined) {
        this._mode = value;
    }

    get arcLine(): SVGElement | undefined {
        return this._arcLine;
    }

    set arcLine(value: SVGElement | undefined) {
        this._arcLine = value;
    }

    protected defaultMouseMoveEvent(e: MouseEvent) {
        if (this._arcLine) {
            this.moveArc(e);
        }
        this.moveElement(e);
        this.moveBreakpoint(e);
        if (this.mouseDown && this.mode === CanvasMode.LASSO) {
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
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
    };

    protected defaultMouseDownEvent(e: PointerEvent) {
        e.preventDefault();
        if (this.mode !== CanvasMode.PANNING) {
            this._petriflowCanvasService.disablePanning();
        }
        if (this.mode === CanvasMode.LASSO) {
            this.mouseDown = true;
            this.rectangle = this._petriflowCanvasService.createRectangle(e.offsetX, e.offsetY);
        }
    }

    protected defaultMouseUpEvent(e: PointerEvent) {
        e.preventDefault();
        this._petriflowCanvasService.enablePanning();
        if (this.mode === CanvasMode.LASSO && this.rectangle) {
            this.mouseDown = false;
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
    }

    protected defaultMouseLeaveEvent() {
    };

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

    protected addArc(element: PetriflowNode<NodeElement>) {
        if (!this._arcLine && this.arcTypes.includes(this._mode as string)) {
            this._arcLine = this.createArcByType(element, this._mode as string) as SVGElement;
        } else if (this._arcLine) {
            const arc = this.createArcByType(element, this._mode as string) as PetriflowArc<Arc>;
            if (arc) {
                this.addArcEvents(arc);
            }
        }
    }

    createArcByType(element: PetriflowNode<NodeElement>, type: string): PetriflowArc<Arc> | SVGElement | undefined {
        if (!this._source) return undefined;
        if (this._source.canvasElement instanceof Place) {
            switch (type) {
                case 'arc': {
                    return this.createArcByGenericType(element, PetriflowPlaceTransitionArc, RegularPlaceTransitionArc, RegularPlaceTransitionArc.ID);
                }
                case 'resetarc': {
                    return this.createArcByGenericType(element, PetriflowResetArc, ResetArc, ResetArc.ID);
                }
                case 'inhibitor': {
                    return this.createArcByGenericType(element, PetriflowInhibitorArc, InhibitorArc, InhibitorArc.ID);
                }
                case 'read': {
                    return this.createArcByGenericType(element, PetriflowReadArc, ReadArc, ReadArc.ID);
                }
                default: {
                    return undefined;
                }
            }
        } else if (type === 'arc') {
            return this.createArcByGenericType(element, PetriflowTransitionPlaceArc, RegularTransitionPlaceArc, RegularTransitionPlaceArc.ID);
        } else {
            return undefined;
        }
    }

    // @ts-ignore
    protected createArcByGenericType<T extends PetriflowArc<Arc>, A extends Arc>(element: PetriflowNode<NodeElement>, type: new(...args) => T, typeArc: new(...args) => A, arrow: string): PetriflowArc<Arc> | SVGElement | undefined {
        if (!this._arcLine) {
            this._source = element;
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source?.constructor) {
            if (!this._petriflowCanvasService.canvas)
                throw new Error("SVG canvas for petriflow objects doesn't exists!");
            if(!this._arcLine) return undefined;
            this._petriflowCanvasService.canvas.container.removeChild(this._arcLine);
            const arc: A = this.createArc(typeArc, this._source?.canvasElement, element.canvasElement, []);
            const petriflowArc: T = this.createArc(type, arc);

            this._petriflowCanvasService.canvas.container.appendChild(arc.container);
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(petriflowArc);
            this._source = undefined;
            this._arcLine = undefined;
            return petriflowArc;
        } else {
            return undefined;
        }
    }

    // @ts-ignore
    createArc<T>(type: new(...args) => T, ...params): T {
        return new type(...params);
    }

    createSvgArc(element: PetriflowNode<NodeElement>, arrowUrl: string): SVGElement {
        if (!this._petriflowCanvasService.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        const arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        arcLine.setAttributeNS(null, 'fill', 'none');
        arcLine.setAttributeNS(null, 'stroke', 'black');
        arcLine.setAttributeNS(null, 'stroke-width', '2');
        arcLine.setAttributeNS(null, 'marker-end', `url(#${arrowUrl})`);
        arcLine.setAttributeNS(null, 'points', `${element.getPosition().x},${element.getPosition().y} ${element.getPosition().x},${element.getPosition().y}`);
        this._petriflowCanvasService.canvas.container.appendChild(arcLine);
        this._arcLine = arcLine;
        return arcLine;
    }

    private selectElement(element: PetriflowNode<NodeElement>) {
        if (this._mode === CanvasMode.MOVE) {
            if (!this._source && this._petriflowCanvasService.petriflowElementsCollection.selected.length === 0) {
                this._source = element;
            } else {
                this._source = undefined;
            }
        }
        if (this._mode === CanvasMode.SELECT) {
            // this._petriflowCanvasService.petriflowElementsCollection.pushEvent(element, CanvasEventType.SELECT);
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
            removedArcs.forEach(arc => {
                let arcIndex = this._petriflowCanvasService.petriflowElementsCollection.arcs.findIndex(petriflowArc => petriflowArc.element === arc);
                // this._petriflowCanvasService.petriflowElementsCollection.pushEvent(this._petriflowCanvasService.petriflowElementsCollection.arcs[arcIndex], CanvasEventType.DELETE);
                this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(arcIndex, 1);
            });
            this._petriflowCanvasService.canvas.remove(element.canvasElement);
            // this._petriflowCanvasService.petriflowElementsCollection.pushEvent(element, CanvasEventType.DELETE);
        }
    }

    private deleteArc(petriflowArc: PetriflowArc<Arc>) {
        if (this._mode === CanvasMode.REMOVE) {
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(petriflowElement => {
                petriflowElement.canvasElement.deleteArcs([petriflowArc.element]);
            });
            this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(
                this._petriflowCanvasService.petriflowElementsCollection.arcs.findIndex(collectionArc => petriflowArc === collectionArc), 1);
            this._petriflowCanvasService.canvas.remove(petriflowArc.element);
            // this._petriflowCanvasService.petriflowElementsCollection.pushEvent(petriflowArc, CanvasEventType.DELETE);
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


    deleteSelectedElements() {
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.places);
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.transitions);
    }

    deleteSelectedCollection(collection: Array<PetriflowNode<NodeElement>>) {
        collection.filter(element => element.isSelected()).forEach(selectedElement => {
            let removedArcs: Array<Arc> = [];
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            selectedElement.canvasElement.arcs.forEach(arc => {
                this._petriflowCanvasService?.canvas?.remove(arc);
                removedArcs.push(arc);
            });
            this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(petriflowElement => petriflowElement.canvasElement.deleteArcs(removedArcs));
            removedArcs.forEach(arc => {
                let arcIndex = this._petriflowCanvasService.petriflowElementsCollection.arcs.findIndex(petriflowArc => petriflowArc.element === arc);
                // this._petriflowCanvasService.petriflowElementsCollection.pushEvent(this._petriflowCanvasService.petriflowElementsCollection.arcs[arcIndex], CanvasEventType.DELETE);
                this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(arcIndex, 1);
            });
            this._petriflowCanvasService.canvas.remove(selectedElement.canvasElement);
            // this._petriflowCanvasService.petriflowElementsCollection.pushEvent(selectedElement, CanvasEventType.DELETE);
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

    private moveElement(e: MouseEvent) {
        if (this._mode === CanvasMode.MOVE && this._source && !this.clipboard) {
            this._source.canvasElement.move(new DOMPoint(e.offsetX, e.offsetY));
        }
    }
}
