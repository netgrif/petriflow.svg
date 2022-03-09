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

@Component({
    selector: 'nab-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    private arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];

    private _transitionMode: string;
    private _isDrawing = false;
    @ViewChild(MatToolbar) toolbar: MatToolbar;
    // TODO: Move properties to some service
    private counter = 1;
    private _arcLine: SVGElement;
    private _source: NodeElement;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
    }

    ngAfterViewInit(): void {
        // TODO: create custom service for events, maybe also use generic, abstraction
        this._petriflowCanvasService.canvas.svg.onclick = (e) => {
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
            const transition = new Transition(`t`, `t${this.counter++}`, new DOMPoint($event.x, $event.y - this.toolbar._elementRef.nativeElement.offsetHeight));
            transition.element.addEventListener('click', (e) => {
                this.addArc(transition);
                this.selectElement(transition);
                this.deleteElement(transition);
            });
            this._petriflowCanvasService.canvas.add(transition);
        }
    }

    private addPlace(e: MouseEvent) {
        if (this.transitionMode === 'place') {
            const place = new Place(`p${this.counter++}`, `p${this.counter}`, 0, new DOMPoint(e.x, e.y - this.toolbar._elementRef.nativeElement.offsetHeight));
            place.element.addEventListener('click', (event) => {
                this.addArc(place);
                this.selectElement(place);
                this.deleteElement(place);
            });
            place.markingTokens.forEach(markingToken => {
                markingToken.onclick = () => {
                    this.addArc(place);
                    this.selectElement(place);
                    this.deleteElement(place);
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
        }
    }

    createArc<T>(type: new(...args) => T, ...args): T {
        return new type(...args);
    }

    private moveArc(e: MouseEvent) {
        if (this._arcLine) {
            const intersect = this._source.getEdgeIntersection(new DOMPoint(e.x, e.y - this.toolbar._elementRef.nativeElement.offsetHeight), 0);
            const offset = new DOMPoint(Math.sign(intersect.x - e.x) * 2, Math.sign(intersect.y - e.y) * 2);
            this.arcLine.setAttributeNS(null, 'points', `${intersect.x},${intersect.y} ${e.x + offset.x},${e.y - this.toolbar._elementRef.nativeElement.offsetHeight + offset.y}`);
        }
    }

    get transitionMode(): string {
        return this._transitionMode;
    }

    set transitionMode(value: string) {
        this._transitionMode = value;
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
        if (this._transitionMode === 'move') {
            if (!this._source) {
                this._source = element;
            } else {
                this._source = undefined;
            }
        }
    }

    private moveElement(e: MouseEvent) {
        if (this.transitionMode === 'move' && this._source) {
            this._source.move(new DOMPoint(e.x, e.y - this.toolbar._elementRef.nativeElement.offsetHeight));
        }
    }

    private deleteElement(element: CanvasElement) {
        if (this._transitionMode === 'remove') {
            if (element instanceof NodeElement) {
                (element as NodeElement).arcs.forEach(arc => {
                        this._petriflowCanvasService.canvas.remove(arc.container);
                    }
                );
            }
            this._petriflowCanvasService.canvas.remove(element.container);
        }
    }

    setArcMode(arcArrowHeader: string) {
        this.transitionMode = 'arc';
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }
}
