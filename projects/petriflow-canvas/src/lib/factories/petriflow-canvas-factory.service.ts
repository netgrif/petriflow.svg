import {Injectable} from '@angular/core';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {PetriflowStaticPlace} from '../svg-elements/petriflow-static-place';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowPlaceTransitionArc} from '../svg-elements/arcs/petriflow-place-transition-arc';
import {PetriflowTransitionPlaceArc} from '../svg-elements/arcs/petriflow-transition-place-arc';
import {PetriflowResetArc} from '../svg-elements/arcs/petriflow-reset-arc';
import {PetriflowReadArc} from '../svg-elements/arcs/petriflow-read-arc';
import {PetriflowInhibitorArc} from '../svg-elements/arcs/petriflow-inhibitor-arc';
import {CanvasElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/canvas-element';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasFactoryService {

    private _transitionIdCounter = 0;
    private _placeIdCounter = 0;
    private _arcIdCounter = 0;

    private _source: NodeElement;
    private _arcLine: SVGElement;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
    }

    createPlace(marking: number, position: DOMPoint, addToElements = true): PetriflowPlace {
        const place = new PetriflowPlace(`p${this._placeIdCounter++}`, `p${this._placeIdCounter}`, marking, position);
        this.addToPetriflowElements(place, addToElements);
        return place;
    }

    createStaticPlace(marking: number, position: DOMPoint, addToElements = true): PetriflowStaticPlace {
        const place = new PetriflowStaticPlace(`p${this._placeIdCounter++}`, `p${this._placeIdCounter}`, marking, position);
        this.addToPetriflowElements(place, addToElements);
        return place;
    }

    createTransition(position: DOMPoint, icon?: string, addToElements = true): PetriflowTransition {
        const transition = new PetriflowTransition(`t${this._transitionIdCounter++}`, `t${this._transitionIdCounter}`, position, icon);
        this.addToPetriflowElements(transition, addToElements);
        return transition;
    }

    private addToPetriflowElements(canvasElement: CanvasElement, addToElements: boolean) {
        if (addToElements) {
            this._petriflowCanvasService.canvas.add(canvasElement);
            this._petriflowCanvasService.petriflowElements.push(canvasElement);
        }
    }

    addArc(element: NodeElement, type: string): Arc | SVGElement {
        if (this._source instanceof Place) {
            switch (type) {
                case 'arc': {
                    return this.createArcByGenericType(element, PetriflowPlaceTransitionArc, PetriflowPlaceTransitionArc.ID);
                }
                case 'resetarc': {
                    return this.createArcByGenericType(element, PetriflowResetArc, PetriflowResetArc.ID);
                }
                case 'inhibitor': {
                    return this.createArcByGenericType(element, PetriflowInhibitorArc, PetriflowInhibitorArc.ID);
                }
                case 'read': {
                    return this.createArcByGenericType(element, PetriflowReadArc, PetriflowReadArc.ID);
                }
            }
        } else if (type === 'arc') {
            return this.createArcByGenericType(element, PetriflowTransitionPlaceArc, PetriflowTransitionPlaceArc.ID);
        }
    }

    private createArcByGenericType<T extends Arc>(element: NodeElement, type: new(...args) => T, arrow: string): Arc | SVGElement {
        if (!this._arcLine) {
            this._source = element;
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source.constructor) {
            this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);
            this.arcLine = undefined;
            const arc: T = this.createArc(type, this._source, element, []);
            this.addToPetriflowElements(arc, true);
            this._source = undefined;
            this._arcLine = undefined;
            return arc;
        }
    }

    createArc<T>(type: new(...args) => T, ...params): T {
        return new type(...params);
    }

    createSvgArc(element: NodeElement, arrowUrl: string): SVGElement {
        const arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        arcLine.setAttributeNS(null, 'fill', 'none');
        arcLine.setAttributeNS(null, 'stroke', 'black');
        arcLine.setAttributeNS(null, 'stroke-width', '2');
        arcLine.setAttributeNS(null, 'marker-end', `url(#${arrowUrl})`);
        arcLine.setAttributeNS(null, 'points', `${element.position.x},${element.position.y} ${element.position.x},${element.position.y}`);
        this._petriflowCanvasService.canvas.container.appendChild(arcLine);
        this.arcLine = arcLine;
        return arcLine;
    }

    get arcLine(): SVGElement {
        return this._arcLine;
    }

    set arcLine(value: SVGElement) {
        this._arcLine = value;
    }

    get source(): NodeElement {
        return this._source;
    }

    set source(value: NodeElement) {
        this._source = value;
    }
}
