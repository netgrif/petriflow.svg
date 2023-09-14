import {Injectable} from '@angular/core';
import {PetriflowCanvas} from './petriflow-canvas';
import {PanzoomObject} from '@panzoom/panzoom';
import {Arc, CanvasConfiguration, NodeElement, Place, StaticPlace, Transition} from '@netgrif/petri.svg';
import {PetriflowNode} from './svg-elements/petriflow-node';
import {PetriflowArc} from './svg-elements/petriflow-arc';
import {GridConfiguration} from './grid-configuration';
import {PetriflowPlace} from './svg-elements/petriflow-place';
import {PetriflowTransition} from './svg-elements/petriflow-transition';

@Injectable({
    providedIn: 'root',
})
export abstract class PetriflowCanvasService {

    // TODO: PF-48 - why removed collection?
    // TODO: PF-48 add canvas and panzoom as constructor args and safeguard that
    //  they are not undefined and remove checks on start of each function
    protected _canvas: PetriflowCanvas | undefined;
    protected _panzoom: PanzoomObject | undefined;
    protected _arcLine: SVGElement | undefined;
    protected _source: PetriflowNode<NodeElement> | undefined;
    protected _clipboardBox: DOMRect | undefined;
    protected _clipboard: SVGElement | undefined;
    protected rectangle: SVGElement | undefined;
    protected _breakpoint: DOMPoint;
    protected _selectedArc: PetriflowArc<Arc> | undefined;
    protected _gridConfiguration = new GridConfiguration();
    protected mouseDown = false;
    protected mouseX = 0;
    protected mouseY = 0;

    protected constructor() {
        this._breakpoint = new DOMPoint();
    }

    public get panzoom(): PanzoomObject | undefined {
        return this._panzoom;
    }

    public set panzoom(value: PanzoomObject | undefined) {
        this._panzoom = value;
    }

    public get xOffset(): number | undefined {
        return this?._panzoom?.getPan()?.x;
    }

    public get yOffset(): number | undefined {
        return this?._panzoom?.getPan()?.y;
    }

    public get scale(): number | undefined {
        return this?._panzoom?.getScale();
    }

    public get canvas(): PetriflowCanvas | undefined {
        return this._canvas;
    }

    public set canvas(value: PetriflowCanvas | undefined) {
        this._canvas = value;
    }

    public disablePanning() {
        if (!!this.panzoom) {
            this.panzoom.setOptions({disablePan: true});
        }
    }

    public enablePanning() {
        if (!!this.panzoom) {
            this.panzoom.setOptions({disablePan: false});
        }
    }

    public createPlace(place: Place | StaticPlace): void {
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        this.canvas.addPlace(place);
    }

    // TODO: PF-48 'add' not 'create'
    public createTransition(transition: Transition): void {
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        this.canvas.addTransition(transition);
    }

    public createRectangle(mouseX: number, mouseY: number): SVGElement {
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        const rectangle = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGElement;
        rectangle.setAttributeNS(null, 'fill', 'none');
        rectangle.setAttributeNS(null, 'class', 'path');
        rectangle.setAttributeNS(null, 'stroke', 'black');
        rectangle.setAttributeNS(null, 'stroke-width', '1');
        rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');
        rectangle.setAttributeNS(null, 'x', `${mouseX}`);
        rectangle.setAttributeNS(null, 'y', `${mouseY}`);
        this.canvas.container.appendChild(rectangle);
        return rectangle;
    }

    public createSvgArc(element: PetriflowNode<NodeElement>, arrowUrl: string): SVGPolygonElement {
        if (!this.canvas) {
            throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
        }
        const arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        arcLine.setAttributeNS(null, 'fill', 'none');
        arcLine.setAttributeNS(null, 'stroke', 'black');
        arcLine.setAttributeNS(null, 'stroke-width', '2');
        arcLine.setAttributeNS(null, 'marker-end', `url(#${arrowUrl})`);
        arcLine.setAttributeNS(null, 'points', `${element.getPosition().x},${element.getPosition().y} ${element.getPosition().x},${element.getPosition().y}`);
        this.canvas.container.appendChild(arcLine);
        return arcLine;
    }

    // moved from petriflow-canvas-configuration-service
    public get arcLine(): SVGElement | undefined {
        return this._arcLine;
    }

    public set arcLine(value: SVGElement | undefined) {
        this._arcLine = value;
    }

    public get source(): PetriflowNode<NodeElement> | undefined {
        return this._source;
    }

    public set source(value: PetriflowNode<NodeElement> | undefined) {
        this._source = value;
    }

    public get clipboard(): SVGElement | undefined {
        return this._clipboard;
    }

    public set clipboard(value: SVGElement | undefined) {
        this._clipboard = value;
    }

    public get clipboardBox(): DOMRect | undefined {
        return this._clipboardBox;
    }

    public set clipboardBox(value: DOMRect | undefined) {
        this._clipboardBox = value;
    }

    public get gridConfiguration(): GridConfiguration {
        return this._gridConfiguration;
    }

    public gridOnOff() {
        this._gridConfiguration.enabled = !this._gridConfiguration.enabled;
    }

    protected copyFromClipboardToCollection(matrix: SVGMatrix, collectionFrom: Array<PetriflowNode<NodeElement>>, collectionTo: Array<PetriflowNode<NodeElement>>) {
        collectionFrom.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            if (copyElement instanceof PetriflowPlace) {
                this.canvas.addPlace(copyElement.canvasElement);
            } else if (copyElement instanceof PetriflowTransition) {
                this.canvas.addTransition(copyElement.canvasElement);
            }
            collectionTo.push(copyElement);
        });
    }

    protected initialiseClipboard() {
        this.clipboard = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'g') as SVGGElement;
        this.clipboard.id = 'petri-svg-clipboard';
    }

    protected pasteElementsFromCollection(collection: Array<PetriflowNode<NodeElement>>) {
        const length = collection.length;
        collection.forEach(element => {
            const newElement = element.clone();
            this.clipboard?.appendChild(newElement.canvasElement.container);
            collection.push(newElement);
        });
        collection.splice(0, length);
    }

    protected createBreakpoint(e: MouseEvent, arc: PetriflowArc<Arc>) {
        if (!this._selectedArc) {
            for (const linePoint of arc.element.linePoints) {
                if (Math.abs(linePoint.x - e.offsetX) < 10 && Math.abs(linePoint.y - e.offsetY) < 10) {
                    this._breakpoint = linePoint;
                    this._selectedArc = arc;
                    return;
                }
            }
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            const newBreakpoint = new DOMPoint(mouseX, mouseY);
            arc.element.linePoints.splice(this.getBreakpointIndex(newBreakpoint, arc.element), 0, newBreakpoint);
            arc.element.move(arc.element.start, arc.element.end);
            this._breakpoint = newBreakpoint;
            this._selectedArc = arc;
        } else if (this._selectedArc) {
            this._breakpoint = new DOMPoint();
            this._selectedArc = undefined;
        }
    }

    protected getBreakpointIndex(newBreakpoint: DOMPoint, arc: Arc): number {
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

    protected getDistanceBetweenPoints(pointStart: DOMPoint, pointEnd: DOMPoint): number {
        return Math.sqrt(Math.pow(pointEnd.x - pointStart.x, 2) + Math.pow(pointEnd.y - pointStart.y, 2));
    }

    protected moveBreakpoint(e: MouseEvent) {
        if (this._breakpoint) {
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            this._breakpoint.x = mouseX;
            this._breakpoint.y = mouseY;
            this._selectedArc?.element.move(this._selectedArc.element.start, this._selectedArc.element.end);
        }
    }

    protected moveArc(e: MouseEvent) {
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

    protected moveElement(e: MouseEvent) {
        if (this._source && !this.clipboard) {
            this._source.move(new DOMPoint(e.offsetX, e.offsetY));
        }
    }

    protected onCanvasMouseMoveClipboard(event: MouseEvent) {
        if (this._clipboard && this._clipboardBox) {
            const x = this.xOffset;
            const y = this.yOffset;
            const scale = this.scale;
            const mouseX = (event.x - (x ?? 0)) / (scale ?? 1) - (this._clipboardBox.x + this._clipboardBox.width / 2 - (x ?? 0)) / (scale ?? 1);
            const mouseY = (event.y - (y ?? 0)) / (scale ?? 1) - (this._clipboardBox.y + this._clipboardBox.height / 2 - (y ?? 0)) / (scale ?? 1);
            this._clipboard.setAttribute('transform', `matrix(1,0,0,1,${mouseX},${mouseY})`);
        }
    }

    public disablePreviousArcMode() {
        if (this.arcLine) {
            this.canvas?.container.removeChild(this.arcLine);
            this.source = undefined;
            this.arcLine = undefined;
        }
    }
}
