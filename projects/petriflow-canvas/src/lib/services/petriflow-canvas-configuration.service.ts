import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowCanvasFactoryService} from '../factories/petriflow-canvas-factory.service';
import {CanvasMode} from '../canvas-mode';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {MatToolbar} from '@angular/material/toolbar';
import {SelectableArc} from '../svg-elements/selectable-arc';
import {CanvasElementCollection} from '../domain/canvas-element-collection';
import {SelectableNode} from '../svg-elements/selectable-node';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';

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
    private _source: SelectableNode;
    private _toolbar: MatToolbar;
    private _clipboardBox: DOMRect;
    private _clipboard: SVGElement;

    private _breakpoint: DOMPoint;
    private _selectedArc: Arc;

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
            this.moveBreakpoint(e);
            if (this.mouseDown && this.mode === CanvasMode.LASSO) {
                this._petriflowCanvasService.deselectAll();
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
            if (this.mode === CanvasMode.LASSO) {
                this._petriflowCanvasService.deselectAll();
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
                this._petriflowCanvasService.setSelectedByRectangleEnclosure(this.rectangle);
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
    addTransitionEvents(petriflowTransition: PetriflowTransition): void {
        petriflowTransition.setOnClick((element) => {
            this.attachCanvasElementOnClickFunctions(element);
        });
    }

    // Place Events
    addPlaceEvents(petriflowPlace: PetriflowPlace): void {
        petriflowPlace.setOnClick((element) => {
            this.attachCanvasElementOnClickFunctions(element);
        });
        petriflowPlace.setOnTokenClickEvent((element) => {
            this.attachCanvasElementOnClickFunctions(element);
        });
    }

    private attachCanvasElementOnClickFunctions(element) {
        this.addArc(element);
        this.selectElement(element);
        this.deleteElement(element);
        this.multipleSelectElement(element);
    }

    // Arc Events
    addArcEvents(arc: SelectableArc) {
        arc.setOnClick((e, element) => {
            this.deleteArc(element);
            this.createBreakpoint(e, element);
            this.multipleSelectElement(element);
        });
    }

    private addArc(element: SelectableNode) {
        if (!this._arcLine && this.arcTypes.includes(this._mode)) {
            this._source = element;
            this._petriflowCanvasFactory.source = element;
            this._arcLine = this._petriflowCanvasFactory.addArc(element, this._mode) as SVGElement;
        } else if (this._arcLine) {
            const arc = this._petriflowCanvasFactory.addArc(element, this._mode) as SelectableArc;
            if (arc) {
                this._source = undefined;
                this._arcLine = undefined;
                this.addArcEvents(arc);
            }
        }
    }

    private selectElement(element: SelectableNode) {
        if (this._mode === CanvasMode.MOVE) {
            if (!this._petriflowCanvasFactory.source && this._petriflowCanvasService.petriflowElementsCollection.selected.length === 0) {
                this._petriflowCanvasFactory.source = element;
            } else {
                this._petriflowCanvasFactory.source = undefined;
            }
        }
    }

    private multipleSelectElement(element: CanvasElement) {
        if (this._mode === CanvasMode.MOVE) {
            if (this._petriflowCanvasService.petriflowElementsCollection.selected.length > 1 &&
                this._petriflowCanvasService.petriflowElementsCollection.selected.includes(element as NodeElement)) {
                this.initialiseClipboard();
                this._petriflowCanvasService.petriflowElementsCollection.selected.forEach(selectedElement => {
                    this.clipboard.appendChild(selectedElement.container);
                });
                this._petriflowCanvasService.petriflowElementsCollection.arcs.filter(arc => arc.isSelected()).forEach(selectedElement => {
                    this.clipboard.appendChild(selectedElement.getContainer());
                });
                this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);
                this._clipboardBox = this.clipboard.getBoundingClientRect();
            }
        }
    }

    private moveElement(e: MouseEvent) {
        if (this._mode === CanvasMode.MOVE && this._petriflowCanvasFactory.source && !this.clipboard) {
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

    private deleteElement(element: NodeElement) {
        if (this._mode === CanvasMode.REMOVE) {
            const removedArcs = [];
            element.arcs.forEach(arc => {
                    this._petriflowCanvasService.canvas.remove(arc);
                    removedArcs.push(arc);
                }
            );
            this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(petriflowElement => {
                petriflowElement.deleteArcs(removedArcs);
            });
            this._petriflowCanvasService.canvas.remove(element);
        }
    }

    private deleteArc(element: Arc) {
        if (this._mode === CanvasMode.REMOVE) {
            this._petriflowCanvasService.canvas.remove(element);
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
            this.clipboard.appendChild(newElement.getContainer());
            arcsCollection.push(newElement);
        });
        arcsCollection.splice(0, length);
        clipboardContent = undefined;
        this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);
        this._clipboardBox = this.clipboard.getBoundingClientRect();
    }

    private pasteElementsFromCollection(collection: Array<CanvasElement>) {
        const length = collection.length;
        collection.forEach(element => {
            const newElement = element.clone();
            this.clipboard.appendChild(newElement.container);
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

    private createArcByDeterminedType(element: SelectableArc, clipboardContent: Array<NodeElement>): SelectableArc {
        const source = element.getSource();
        const destination = element.getDestination();
        const startIndex = clipboardContent.findIndex(startElement => {
            return source.container === startElement.container;
        });
        const endIndex = clipboardContent.findIndex(endElement => {
            return destination.container === endElement.container;
        });
        return element.cloneArc(this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[startIndex],
            this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[endIndex]);
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
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.places);
        this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.transitions);
    }

    deleteSelectedCollection(collection: Array<NodeElement>) {
        let removedArcs = [];
        collection.filter(element => element.isSelected()).forEach(selectedElement => {
            selectedElement.arcs.forEach(arc => {
                this._petriflowCanvasService.canvas.remove(arc);
                removedArcs.push(arc);
            });
            this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(petriflowElement => petriflowElement.deleteArcs(removedArcs));
            removedArcs.forEach(arc => {
                this._petriflowCanvasService.petriflowElementsCollection.arcs.splice(this._petriflowCanvasService.petriflowElementsCollection.arcs.indexOf(arc), 1);
            });
            removedArcs = [];
            this._petriflowCanvasService.canvas.remove(selectedElement);
            collection.splice(collection.indexOf(selectedElement), 1);
        });
    }

    initialiseClipboard() {
        this.clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this.clipboard.id = 'canvas-clipboard';
    }

    destroyAndReduceClipboard() {
        const matrix = (this.clipboard as SVGSVGElement).transform?.baseVal[0]?.matrix;
        this.copyFromClipboardToCollection(matrix, this._petriflowCanvasService.petriflowClipboardElementsCollection.places,
            this._petriflowCanvasService.petriflowElementsCollection.places);
        this.copyFromClipboardToCollection(matrix, this._petriflowCanvasService.petriflowClipboardElementsCollection.transitions,
            this._petriflowCanvasService.petriflowElementsCollection.transitions);
        this._petriflowCanvasService.petriflowClipboardElementsCollection.arcs.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            this._petriflowCanvasService.canvas.container.appendChild(copyElement.getContainer());
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(copyElement);
        });
        this.deleteClipboard();
    }

    private copyFromClipboardToCollection(matrix: SVGMatrix, collectionFrom: Array<CanvasElement>, collectionTo: Array<CanvasElement>) {
        collectionFrom.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            this._petriflowCanvasService.canvas.add(copyElement);
            collectionTo.push(copyElement);
        });
    }

    destroyAndMoveElements() {
        const matrix = (this.clipboard as SVGSVGElement).transform?.baseVal[0]?.matrix;
        this._petriflowCanvasService.petriflowElementsCollection.selected.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            this._petriflowCanvasService.canvas.add(copyElement);
        });
        this._petriflowCanvasService.petriflowElementsCollection.arcs.filter(arc => arc.isSelected()).forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            this._petriflowCanvasService.canvas.container.appendChild(copyElement.getContainer());
        });
        this.deleteClipboard();
    }

    deleteClipboard() {
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

    get clipboard(): SVGElement {
        return this._clipboard;
    }

    set clipboard(value: SVGElement) {
        this._clipboard = value;
    }

    private createBreakpoint(e: MouseEvent, arc: Arc) {
        if (this.mode === CanvasMode.MOVE && !this._selectedArc) {
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const mouseX = (e.x - offset.x) / offset.scale;
            const mouseY = (e.y - this._toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale;
            const newBreakpoint = new DOMPoint(mouseX, mouseY);
            arc.linePoints.splice(this.getBreakpointIndex(newBreakpoint, arc), 0, newBreakpoint);
            arc.move(arc.start, arc.end);
            this._breakpoint = newBreakpoint;
            this._selectedArc = arc;
        } else if (this.mode === CanvasMode.MOVE && this._selectedArc) {
            this._breakpoint = undefined;
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
            const offset = this._petriflowCanvasService.getPanZoomOffset();
            const mouseX = (e.x - offset.x) / offset.scale;
            const mouseY = (e.y - this._toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale;
            this._breakpoint.x = mouseX;
            this._breakpoint.y = mouseY;
            this._selectedArc.move(this._selectedArc.start, this._selectedArc.end);
        }
    }
}
