import {Injectable} from '@angular/core';
import {
    PetriflowArc,
    PetriflowCanvasConfiguration,
    PetriflowCanvasElement,
    PetriflowCanvasService,
    PetriflowInhibitorArc,
    PetriflowNode,
    PetriflowPlace,
    PetriflowPlaceTransitionArc,
    PetriflowReadArc,
    PetriflowResetArc,
    PetriflowTransition,
    PetriflowTransitionPlaceArc
} from '@netgrif/petriflow.svg';
import {CanvasElementCollection} from '../domain/canvas-element-collection';
import {CanvasMode} from '../domain/canvas-mode';
import {
    Arc,
    InhibitorArc,
    NodeElement,
    Place,
    ReadArc,
    RegularPlaceTransitionArc,
    RegularTransitionPlaceArc,
    ResetArc
} from '@netgrif/petri.svg';

@Injectable({
    providedIn: 'root'
})
export class ControlPetriflowCanvasService extends PetriflowCanvasService {

    private arcTypes = ['regular', 'reset', 'inhibitor', 'read'];
    private readonly _petriflowElementsCollection: CanvasElementCollection;
    private _petriflowClipboardElementsCollection: CanvasElementCollection;
    protected _mode: CanvasMode | undefined;

    constructor() {
        super();
        this._petriflowElementsCollection = new CanvasElementCollection();
        this._petriflowClipboardElementsCollection = new CanvasElementCollection();
    }

    setSelectedByRectangleEnclosure(rectangle: SVGElement) {
        if (!this.canvas) {
            return;
        }
        const newRect = this.canvas.svg.createSVGRect();
        newRect.x = +(rectangle.getAttribute('x') ?? 0);
        newRect.y = +(rectangle.getAttribute('y') ?? 0);
        newRect.width = +(rectangle.getAttribute('width') ?? 0);
        newRect.height = +(rectangle.getAttribute('height') ?? 0);
        this._petriflowElementsCollection.all.forEach(petriflowElement => {
            if (petriflowElement.isEnclosedByRectangle(newRect)) {
                petriflowElement.setSelected(true);
                petriflowElement.activate();
            }
        });
    }

    copyElements(from: CanvasElementCollection, to: CanvasElementCollection, append = false): CanvasElementCollection {
        if (!append) {
            to = new CanvasElementCollection();
            to.places = from.places.filter(place => place.isSelected());
            to.transitions = from.transitions.filter(place => place.isSelected());
            to.arcs = from.arcs.filter(place => place.isSelected());
        } else {
            from.places.forEach(place => to.places.push(place));
            from.transitions.forEach(place => to.transitions.push(place));
            from.arcs.forEach(place => to.arcs.push(place));
        }
        return to;
    }

    selectAll() {
        this.petriflowElementsCollection.all.forEach(element => {
            element.select();
        });
    }

    deselectAll() {
        this.petriflowElementsCollection.all.forEach(element => {
            element.deselect();
        });
    }

    get petriflowElementsCollection(): CanvasElementCollection {
        return this._petriflowElementsCollection;
    }

    get petriflowClipboardElementsCollection(): CanvasElementCollection {
        return this._petriflowClipboardElementsCollection;
    }

    set petriflowClipboardElementsCollection(value: CanvasElementCollection) {
        this._petriflowClipboardElementsCollection = value;
    }

    public addCanvasEvent(svg: SVGGElement) {
        svg.onpointermove = (e) => this.mouseMoveEvent(e);
        svg.onpointerdown = (e) => this.mouseDownEvent(e);
        svg.onpointerup = (e) => this.mouseUpEvent(e);
        svg.onpointerleave = () => this.mouseLeaveEvent();
    }

    protected mouseMoveEvent(e: MouseEvent) {
        if (this._arcLine) {
            this.moveArc(e);
        }
        this.moveElement(e);
        this.moveBreakpoint(e);
        if (this.mouseDown && this.mode === CanvasMode.LASSO) {
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this.deselectAll();
            this.canvas.svg.deselectAll();
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

    protected mouseDownEvent(e: PointerEvent) {
        e.preventDefault();
        if (this.mode !== CanvasMode.PANNING) {
            this.disablePanning();
        }
        if (this.mode === CanvasMode.LASSO) {
            this.deselectAll();
            this.mouseDown = true;
            this.rectangle = this.createRectangle(e.offsetX, e.offsetY);
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }
        this.onMouseMoveDownDestroyClipboard();
    }

    protected mouseUpEvent(e: PointerEvent) {
        e.preventDefault();
        this.enablePanning();
        if (this.mode === CanvasMode.LASSO && this.rectangle) {
            this.setSelectedByRectangleEnclosure(this.rectangle);
            this.mouseDown = false;
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
    }

    protected mouseLeaveEvent() {
        this.deleteClipboard();
    };

    addTransitionEvents(petriflowTransition: PetriflowTransition): void {
        // @ts-ignore
        petriflowTransition.setOnClick((element, event) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>, event as Event);
        });
        // @ts-ignore
        petriflowTransition.setOnContext((element, event) => {
        });
    }

    // Place Events
    addPlaceEvents(petriflowPlace: PetriflowPlace): void {
        petriflowPlace.setOnClick((element, event) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>, event as Event);
        });
        petriflowPlace.setOnTokenClickEvent((element, event) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>, event as Event);
        });
    }

    // @ts-ignore
    private attachCanvasElementOnClickFunctions(element: PetriflowNode<NodeElement>, event: Event | undefined) {
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
            this._source = element;
            this._arcLine = this.createArcByType(element, this._mode as string) as SVGElement;
        } else if (this._arcLine) {
            const arc = this.createArcByType(element, this._mode as string) as PetriflowArc<Arc>;
            if (arc) {
                this.addArcEvents(arc);
            }
        }
    }

    createArcByType(element: PetriflowNode<NodeElement>, type: string): PetriflowArc<Arc> | SVGElement | undefined {
        if (!this._source) {
            return undefined;
        }
        if (this._source.canvasElement instanceof Place) {
            switch (type) {
                case 'regular': {
                    return this.createArcByGenericType(element, PetriflowPlaceTransitionArc, RegularPlaceTransitionArc, RegularPlaceTransitionArc.ID);
                }
                case 'reset': {
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
        } else if (type === 'regular') {
            return this.createArcByGenericType(element, PetriflowTransitionPlaceArc, RegularTransitionPlaceArc, RegularTransitionPlaceArc.ID);
        }
        return undefined;
    }

    // @ts-ignore
    protected createArcByGenericType<T extends PetriflowArc<Arc>, A extends Arc>(element: PetriflowNode<NodeElement>, type: new(...args) => T, typeArc: new(...args) => A, arrow: string): PetriflowArc<Arc> | SVGElement | undefined {
        if (!this._arcLine) {
            this._arcLine = this.createSvgArc(element, arrow);
            return this._arcLine;
        } else if (element.constructor !== this._source?.constructor) {
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            if (!this._arcLine) {
                return undefined;
            }
            this.canvas.container.removeChild(this._arcLine);
            const arc: A = this.createArc(typeArc, `a${++PetriflowCanvasConfiguration.ARC_ID_COUNTER}`,
                this._source?.canvasElement, element.canvasElement, []);
            const petriflowArc: T = this.createArc(type, arc);

            this.canvas.container.appendChild(arc.container);
            this.petriflowElementsCollection.arcs.push(petriflowArc);
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

    private selectElement(element: PetriflowNode<NodeElement>) {
        if (this._mode === CanvasMode.MOVE) {
            if (!this._source && this.petriflowElementsCollection.selected.length === 0) {
                this._source = element;
            } else {
                this._source = undefined;
            }
        }
        if (this._mode === CanvasMode.SELECT) {
        }
    }

    private multipleSelectElement(element: PetriflowCanvasElement) {
        if (this._mode === CanvasMode.MOVE) {
            if (this.petriflowElementsCollection.selected.length > 0 &&
                this.petriflowElementsCollection.selected.includes(element as PetriflowNode<NodeElement>)) {
                this.initialiseClipboard();
                this.petriflowElementsCollection.selected.forEach(selectedElement => {
                    this.clipboard?.appendChild(selectedElement.canvasElement.container);
                });
                this.petriflowElementsCollection.arcs.filter(arc => arc.isSelected()).forEach(selectedElement => {
                    this.clipboard?.appendChild(selectedElement.element.container);
                });
                if (!this.canvas) {
                    throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
                }
                if (this.clipboard) {
                    this.canvas.container.appendChild(this.clipboard);
                    this._clipboardBox = this.clipboard.getBoundingClientRect();
                }
            }
        }
    }

    private deleteElement(element: PetriflowNode<NodeElement>) {
        if (this._mode === CanvasMode.REMOVE) {
            const removedArcs: Array<Arc> = [];
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            element.canvasElement.arcs.forEach((arc: Arc) => {
                    this?.canvas?.removeArc(arc);
                    removedArcs.push(arc);
                }
            );
            this.petriflowElementsCollection.nodes.forEach(petriflowElement => {
                petriflowElement.canvasElement.deleteArcs(removedArcs);
            });
            removedArcs.forEach(arc => {
                let arcIndex = this.petriflowElementsCollection.arcs.findIndex(petriflowArc => petriflowArc.element === arc);
                this.petriflowElementsCollection.arcs.splice(arcIndex, 1);
            });
            if (element instanceof PetriflowPlace) {
                this.canvas.removePlace(element.canvasElement);
            } else if (element instanceof PetriflowTransition) {
                this.canvas.removeTransition(element.canvasElement);
            }
        }
    }

    private deleteArc(petriflowArc: PetriflowArc<Arc>) {
        if (this._mode === CanvasMode.REMOVE) {
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this.petriflowElementsCollection.nodes.forEach(petriflowElement => {
                petriflowElement.canvasElement.deleteArcs([petriflowArc.element]);
            });
            this.petriflowElementsCollection.arcs.splice(
                this.petriflowElementsCollection.arcs.findIndex(collectionArc => petriflowArc === collectionArc), 1);
            this.canvas.removeArc(petriflowArc.element);
        }
    }

    copyElementsToClipboard() {
        this.petriflowClipboardElementsCollection = this.copyElements(
            this.petriflowElementsCollection,
            this.petriflowClipboardElementsCollection
        );
    }

    pasteElements() {
        this.initialiseClipboard();

        let clipboardContent = [...this.petriflowClipboardElementsCollection.nodes];
        this.pasteElementsFromCollection(this.petriflowClipboardElementsCollection.places);
        this.pasteElementsFromCollection(this.petriflowClipboardElementsCollection.transitions);

        const arcsCollection = this.petriflowClipboardElementsCollection.arcs;
        const length = arcsCollection.length;
        arcsCollection.forEach(element => {
            const newElement = this.createArcByDeterminedType(element, clipboardContent);
            this.addArcEvents(newElement);
            this.clipboard?.appendChild(newElement.element.container);
            arcsCollection.push(newElement);
        });
        arcsCollection.splice(0, length);
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        clipboardContent = [];
        if (this.clipboard) {
            this.canvas.container.appendChild(this.clipboard);
            this._clipboardBox = this.clipboard?.getBoundingClientRect();
        }
    }

    protected pasteElementsFromCollection(collection: Array<PetriflowNode<NodeElement>>) {
        const length = collection.length;
        collection.forEach(element => {
            const newElement = element.clone();
            if (element instanceof PetriflowPlace) {
                this.addPlaceEvents(newElement as PetriflowPlace);
            } else if (element instanceof PetriflowTransition) {
                this.addTransitionEvents(newElement as PetriflowTransition);
            }
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
        return petriflowArc.cloneArc(
            `a${++PetriflowCanvasConfiguration.ARC_ID_COUNTER}`,
            this.petriflowClipboardElementsCollection.nodes[startIndex].canvasElement,
            this.petriflowClipboardElementsCollection.nodes[endIndex].canvasElement
        );
    }

    deleteSelectedElements() {
        this.deleteSelectedCollection(this.petriflowElementsCollection.places);
        this.deleteSelectedCollection(this.petriflowElementsCollection.transitions);
    }

    protected onMouseMoveDownDestroyClipboard() {
        if (this.clipboard && this._clipboardBox && this.mode === CanvasMode.LASSO) {
            this.destroyAndReduceClipboard();
        } else if (this.clipboard && this._clipboardBox && this.mode === CanvasMode.MOVE) {
            this.destroyAndMoveElements();
        }
    }

    deleteSelectedCollection(collection: Array<PetriflowNode<NodeElement>>) {
        collection.filter(element => element.isSelected()).forEach(selectedElement => {
            let removedArcs: Array<Arc> = [];
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            selectedElement.canvasElement.arcs.forEach((arc: Arc) => {
                this?.canvas?.removeArc(arc);
                removedArcs.push(arc);
            });
            this.petriflowElementsCollection.nodes.forEach(petriflowElement => petriflowElement.canvasElement.deleteArcs(removedArcs));
            removedArcs.forEach(arc => {
                let arcIndex = this.petriflowElementsCollection.arcs.findIndex(petriflowArc => petriflowArc.element === arc);
                this.petriflowElementsCollection.arcs.splice(arcIndex, 1);
            });
            if (selectedElement instanceof PetriflowPlace) {
                this.canvas.removePlace(selectedElement.canvasElement);
            } else if (selectedElement instanceof PetriflowTransition) {
                this.canvas.removeTransition(selectedElement.canvasElement);
            }
            collection.splice(collection.indexOf(selectedElement), 1);
        });
    }

    destroyAndReduceClipboard() {
        const matrix = (this.clipboard as SVGSVGElement).transform?.baseVal[0]?.matrix;
        this.copyFromClipboardToCollection(matrix, this.petriflowClipboardElementsCollection.places,
            this.petriflowElementsCollection.places);
        this.copyFromClipboardToCollection(matrix, this.petriflowClipboardElementsCollection.transitions,
            this.petriflowElementsCollection.transitions);
        this.petriflowClipboardElementsCollection.arcs.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this.canvas.container.appendChild(copyElement.element.container);
            this.petriflowElementsCollection.arcs.push(copyElement);
        });
        this.deleteClipboard();
    }

    destroyAndMoveElements() {
        const matrix = (this.clipboard as SVGSVGElement).transform?.baseVal[0]?.matrix;
        this.petriflowElementsCollection.selected.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            if (copyElement instanceof PetriflowPlace) {
                this.canvas.addPlace(copyElement.canvasElement);
            } else if (copyElement instanceof PetriflowTransition) {
                this.canvas.addTransition(copyElement.canvasElement);
            }
        });
        this.petriflowElementsCollection.arcs.filter(arc => arc.isSelected()).forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this.canvas.container.appendChild(copyElement.element.container);
        });
        this.deleteClipboard();
    }

    deleteClipboard() {
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        if (this.clipboard) {
            this.canvas.container.removeChild(this.clipboard);
            this.clipboard = undefined;
            this.petriflowClipboardElementsCollection = new CanvasElementCollection();
        }
        if (this.rectangle) {
            this.mouseDown = false;
            this.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
        if (this._arcLine) {
            this.canvas.container.removeChild(this._arcLine);
            this._arcLine = undefined;
            this.mouseDown = false;
        }
    }

    protected createBreakpoint(e: MouseEvent, arc: PetriflowArc<Arc>) {
        if (this.mode === CanvasMode.MOVE) {
            super.createBreakpoint(e, arc);
        }
    }

    protected moveBreakpoint(e: MouseEvent) {
        if (this.mode === CanvasMode.MOVE) {
            super.moveBreakpoint(e);
        }
    }

    protected moveElement(e: MouseEvent) {
        if (this._mode === CanvasMode.MOVE) {
            super.moveElement(e);
        }
    }

    public get mode(): CanvasMode | undefined {
        return this._mode;
    }

    public set mode(value: CanvasMode | undefined) {
        this._mode = value;
    }

    public gridOnOff() {
        super.gridOnOff();
    }
}
