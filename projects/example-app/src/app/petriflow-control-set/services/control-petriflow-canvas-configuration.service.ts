import {Injectable} from '@angular/core';
import {
    PetriflowArc,
    PetriflowCanvasConfigurationService,
    PetriflowCanvasElement,
    PetriflowInhibitorArc,
    PetriflowNode,
    PetriflowPlace,
    PetriflowPlaceTransitionArc,
    PetriflowReadArc,
    PetriflowResetArc,
    PetriflowTransition,
    PetriflowTransitionPlaceArc,
    PetriflowCanvasConfiguration
} from "@netgrif/petriflow.svg";
import {ControlPetriflowCanvasService} from "./control-petriflow-canvas.service";
import {CanvasElementCollection} from "../domain/canvas-element-collection";
import {
    Arc,
    InhibitorArc,
    NodeElement,
    Place,
    ReadArc,
    RegularPlaceTransitionArc,
    RegularTransitionPlaceArc,
    ResetArc
} from "@netgrif/petri.svg";
import {CanvasMode} from '../domain/canvas-mode';

@Injectable({
    providedIn: 'root'
})
export class ControlPetriflowCanvasConfigurationService extends PetriflowCanvasConfigurationService {

    private arcTypes = ['regular', 'reset', 'inhibitor', 'read'];

    protected _mode: CanvasMode | undefined;

    public get mode(): CanvasMode | undefined {
        return this._mode;
    }

    public set mode(value: CanvasMode | undefined) {
        this._mode = value;
    }

    constructor(protected _petriflowCanvasService: ControlPetriflowCanvasService) {
        super(_petriflowCanvasService);
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

    protected mouseDownEvent(e: PointerEvent) {
        e.preventDefault();
        if (this.mode !== CanvasMode.PANNING) {
            this._petriflowCanvasService.disablePanning();
        }
        if (this.mode === CanvasMode.LASSO) {
            this._petriflowCanvasService.deselectAll();
            this.mouseDown = true;
            this.rectangle = this._petriflowCanvasService.createRectangle(e.offsetX, e.offsetY);
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }
        this.onMouseMoveDownDestroyClipboard();
    }

    protected mouseUpEvent(e: PointerEvent) {
        e.preventDefault();
        this._petriflowCanvasService.enablePanning();
        if (this.mode === CanvasMode.LASSO && this.rectangle) {
            this._petriflowCanvasService.setSelectedByRectangleEnclosure(this.rectangle);
            this.mouseDown = false;
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);
            this.rectangle = undefined;
        }
    }

    protected mouseLeaveEvent() {
        this.deleteClipboard();
    };

    addTransitionEvents(petriflowTransition: PetriflowTransition): void {
        petriflowTransition.setOnClick((element, event) => {
            this.attachCanvasElementOnClickFunctions(element as PetriflowNode<NodeElement>, event as Event);
        });
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
        if (!this._source) return undefined;
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
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source?.constructor) {
            if (!this._petriflowCanvasService.canvas)
                throw new Error("SVG canvas for petriflow objects doesn't exists!");
            if (!this._arcLine) return undefined;
            this._petriflowCanvasService.canvas.container.removeChild(this._arcLine);
            const arc: A = this.createArc(typeArc, `a${++PetriflowCanvasConfiguration.ARC_ID_COUNTER}`,
                this._source?.canvasElement, element.canvasElement, []);
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
        this._arcLine = this._petriflowCanvasService.createSvgArc(element, arrowUrl);
        return this._arcLine;
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
        }
    }

    private multipleSelectElement(element: PetriflowCanvasElement) {
        if (this._mode === CanvasMode.MOVE) {
            if (this._petriflowCanvasService.petriflowElementsCollection.selected.length > 0 &&
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
                this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(arcIndex, 1);
            });
            this._petriflowCanvasService.canvas.remove(element.canvasElement);
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
        }
    }

    copyElements() {
        this._petriflowCanvasService.petriflowClipboardElementsCollection = this._petriflowCanvasService.copyElements(
            this._petriflowCanvasService.petriflowElementsCollection,
            this._petriflowCanvasService.petriflowClipboardElementsCollection
        );
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
            this.addArcEvents(newElement);
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
            this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[startIndex].canvasElement,
            this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[endIndex].canvasElement
        );
    }


    deleteSelectedElements() {
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.places);
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.transitions);
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
                this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(arcIndex, 1);
            });
            this._petriflowCanvasService.canvas.remove(selectedElement.canvasElement);
            collection.splice(collection.indexOf(selectedElement), 1);
        });
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
}
