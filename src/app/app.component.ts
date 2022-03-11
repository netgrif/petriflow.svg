import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PetriflowCanvasService} from '../../projects/petriflow-canvas/src/lib/petriflow-canvas.service';
import {MatToolbar} from '@angular/material/toolbar';
import {NodeElement} from '../../projects/canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasConfiguration} from '../../projects/canvas/src/lib/canvas/canvas-configuration';
import {RegularPlaceTransitionArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/regular-place-transition-arc';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {CanvasElement} from '../../projects/canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';
import {PlaceTransitionArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/place-transition-arc';
import {ResetArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/reset-arc';
import {InhibitorArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/inhibitor-arc';
import {ReadArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/read-arc';
import {TransitionPlaceArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/transition-place-arc';
import {RegularTransitionPlaceArc} from '../../projects/canvas/src/lib/canvas/svg-elements/arc/regular-transition-place-arc';
import createPanZoom, {PanZoom, Transform} from 'panzoom';

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
    // TODO: Move properties to some service
    private counter = 1;
    private _arcLine: SVGElement;
    private _source: NodeElement;
    private _panzoom: PanZoom;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
    }

    ngAfterViewInit(): void {
        this._panzoom = createPanZoom(this._petriflowCanvasService.canvas.container);
        // TODO: create custom service for events, maybe also use generic, abstraction
        this._petriflowCanvasService.canvas.svg.onclick = (e) => {
            console.log(this._panzoom.getTransform());
            this.addTransition(e);
            this.addPlace(e);
        };
        this._petriflowCanvasService.canvas.svg.onmousemove = (e) => {
            this.moveArc(e);
            this.moveElement(e);
        };
    }

    private addTransition($event): void {
        if (this.transitionMode === 'transition') {
            const offset = this.getPanZoomOffset();
            const transition = new Transition(`t`, `t${this.counter++}`, new DOMPoint(($event.x - offset.x) / offset.scale,
                ($event.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale));
            transition.element.addEventListener('click', (e) => {
                this.addArc(transition);
                this.selectElement(transition);
                this.deleteElement(transition);
            });
            transition.element.onmouseenter = () => {
                transition.activate();
            };
            transition.element.onmouseleave = () => {
                transition.deactivate();
            };
            this._petriflowCanvasService.canvas.add(transition);
        }
    }

    private addPlace(e: MouseEvent) {
        if (this.transitionMode === 'place') {
            const offset = this.getPanZoomOffset();
            const place = new Place(`p${this.counter++}`, `p${this.counter}`, 0, new DOMPoint((e.x - offset.x) / offset.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offset.y) / offset.scale));
            place.element.addEventListener('click', () => {
                this.addArc(place);
                this.selectElement(place);
                this.deleteElement(place);
            });

            place.element.onmouseenter = () => {
                place.activate();
            };
            place.element.onmouseleave = () => {
                place.deactivate();
            };
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
            this._petriflowCanvasService.canvas.add(place);
        }
    }

    // TODO: move all this methods below to some service
    private createSvgArc(element: NodeElement, arrowUrl: string) {
        this._arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        this._arcLine.setAttributeNS(null, 'fill', 'none');
        this._arcLine.setAttributeNS(null, 'stroke', 'black');
        this._arcLine.setAttributeNS(null, 'stroke-width', '2');
        this._arcLine.setAttributeNS(null, 'marker-end', `url(#${arrowUrl})`);
        this._arcLine.setAttributeNS(null, 'points', `${element.position.x},${element.position.y} ${element.position.x},${element.position.y}`);
        this._source = element;
        this._petriflowCanvasService.canvas.container.appendChild(this._arcLine);
    }

    private addArc(element: NodeElement) {
        if (!this._arcLine && this.arcTypes.includes(this.transitionMode)) {
            this._source = element;
        }
        if (this._source instanceof Place) {
            switch (this.transitionMode) {
                case 'arc': {
                    this.createArcByGenericType(element, RegularPlaceTransitionArc, RegularPlaceTransitionArc.ID);
                    break;
                }
                case 'resetarc': {
                    this.createArcByGenericType(element, ResetArc, ResetArc.ID);
                    break;
                }
                case 'inhibitor': {
                    this.createArcByGenericType(element, InhibitorArc, InhibitorArc.ID);
                    break;
                }
                case 'read': {
                    this.createArcByGenericType(element, ReadArc, ReadArc.ID);
                    break;
                }
            }
        } else if (this.transitionMode === 'arc') {
            this.createArcByGenericType(element, RegularTransitionPlaceArc, RegularPlaceTransitionArc.ID);
        }
    }

    private createArcByGenericType<T extends PlaceTransitionArc | TransitionPlaceArc>(element: NodeElement, type: new(...args) => T, arrow: string) {
        if (!this.arcTypes.includes(this.transitionMode)) {
            return;
        }
        if (!this._arcLine) {
            this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source.constructor) {
            this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);
            this.arcLine = undefined;
            const arc: T = this.createArc(type, this._source, element, []);
            this._petriflowCanvasService.canvas.add(arc);
            this._source = undefined;
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

    createArc<T>(type: new(...args) => T, ...args): T {
        return new type(...args);
    }

    private moveArc(e: MouseEvent) {
        if (this._arcLine) {
            const offsetPanZoom = this.getPanZoomOffset();
            const intersect = this._source.getEdgeIntersection(new DOMPoint((e.x - offsetPanZoom.x) / offsetPanZoom.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale), 0);
            const xLineLength = ((e.x - offsetPanZoom.x) / offsetPanZoom.scale) - intersect.x;
            const yLineLength = ((e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale) - intersect.y;
            const arcLength = Math.sqrt(xLineLength * xLineLength + yLineLength * yLineLength);
            const arcLengthOffset = arcLength - CanvasConfiguration.ARROW_HEAD_SIZE;
            const arcRatio = arcLengthOffset / arcLength;
            const finalX = intersect.x + xLineLength * arcRatio;
            const finalY = intersect.y + yLineLength * arcRatio;
            this.arcLine.setAttributeNS(null, 'points', `${intersect.x},${intersect.y} ${finalX},${finalY}`);
        }
    }

    get transitionMode(): string {
        return this._canvasMode;
    }

    set canvasMode(value: string) {
        this._canvasMode = value;
    }

    get isDrawing(): boolean {
        return this._isDrawing;
    }

    set isDrawing(value: boolean) {
        this._isDrawing = value;
    }

    get arcLine(): SVGElement {
        return this._arcLine;
    }

    set arcLine(value: SVGElement) {
        this._arcLine = value;
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
            const offsetPanZoom = this.getPanZoomOffset();
            this._source.move(new DOMPoint((e.x - offsetPanZoom.x) / offsetPanZoom.scale, (e.y - this.toolbar._elementRef.nativeElement.offsetHeight - offsetPanZoom.y) / offsetPanZoom.scale));
        }
    }

    private deleteElement(element: CanvasElement) {
        if (this._canvasMode === 'remove') {
            if (element instanceof NodeElement) {
                (element as NodeElement).arcs.forEach(arc => {
                        this._petriflowCanvasService.canvas.remove(arc.container);
                    }
                );
            }
            this._petriflowCanvasService.canvas.remove(element.container);
        }
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }

    getPanZoomOffset(): Transform {
        return this._panzoom.getTransform();
    }

    // TODO: This move then to petriflow-canvas service
    selectAll() {
    }

    changeCanvasMode(mode: string, panzoomEnabled = false) {
        this.canvasMode = mode;
        if (panzoomEnabled && this._panzoom.isPaused()) {
            this._panzoom.resume();
        } else if (!panzoomEnabled && !this._panzoom.isPaused()) {
        }
    }
}
