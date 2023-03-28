import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {CanvasMode} from '../canvas-mode';
import {Arc, CanvasConfiguration, NodeElement} from '@netgrif/petri.svg';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {PetriflowArc} from '../svg-elements/petriflow-arc';

@Injectable({
    providedIn: 'root'
})
export abstract class PetriflowCanvasConfigurationService {

    protected _mode: CanvasMode | undefined;
    protected _arcLine: SVGElement | undefined;
    protected _source: PetriflowNode<NodeElement> | undefined;
    protected _clipboardBox: DOMRect | undefined;
    protected _clipboard: SVGElement | undefined;
    protected rectangle: SVGElement | undefined;
    private _breakpoint: DOMPoint;
    private _selectedArc: PetriflowArc<Arc> | undefined;

    protected mouseDown = false;
    protected mouseX = 0;
    protected mouseY = 0;

    constructor(protected _petriflowCanvasService: PetriflowCanvasService) {
        this._breakpoint = new DOMPoint();
    }

    public get mode(): CanvasMode | undefined {
        return this._mode;
    }

    public set mode(value: CanvasMode | undefined) {
        this._mode = value;
    }

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

    protected copyFromClipboardToCollection(matrix: SVGMatrix, collectionFrom: Array<PetriflowNode<NodeElement>>, collectionTo: Array<PetriflowNode<NodeElement>>) {
        collectionFrom.forEach(copyElement => {
            copyElement.moveBy(matrix.e, matrix.f);
            if (!this._petriflowCanvasService.canvas) {
                throw new Error('SVG canvas for petriflow objects doesn\'t exists!');
            }
            this._petriflowCanvasService.canvas.add(copyElement.canvasElement);
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
        if (this.mode === CanvasMode.MOVE && this._breakpoint) {
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
        if (this._mode === CanvasMode.MOVE && this._source && !this.clipboard) {
            this._source.canvasElement.move(new DOMPoint(e.offsetX, e.offsetY));
        }
    }

    protected onCanvasMouseMoveClipboard(event: MouseEvent) {
        if (this._clipboard && this._clipboardBox) {
            const x = this._petriflowCanvasService.xOffset;
            const y = this._petriflowCanvasService.yOffset;
            const scale = this._petriflowCanvasService.scale;
            const mouseX = (event.x - (x ?? 0)) / (scale ?? 1) - (this._clipboardBox.x + this._clipboardBox.width / 2 - (x ?? 0)) / (scale ?? 1);
            const mouseY = (event.y - (y ?? 0)) / (scale ?? 1) - (this._clipboardBox.y + this._clipboardBox.height / 2 - (y ?? 0)) / (scale ?? 1);
            this._clipboard.setAttribute('transform', `matrix(1,0,0,1,${mouseX},${mouseY})`);
        }
    }

    public disablePreviousArcMode() {
        if (this.arcLine) {
            this._petriflowCanvasService.canvas?.container.removeChild(this.arcLine);
            this.source = undefined;
            this.arcLine = undefined;
        }
    }
}
