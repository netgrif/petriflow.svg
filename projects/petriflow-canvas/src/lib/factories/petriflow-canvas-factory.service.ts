import {Injectable} from '@angular/core';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowPlace} from '../svg-elements/PetriflowPlace';
import {StaticPlace} from '../../../../canvas/src/lib/canvas/svg-elements/place/static-place';
import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {PetriflowTransition} from '../svg-elements/PetriflowTransition';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {PlaceTransitionArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/abstract-arc/place-transition-arc';
import {TransitionPlaceArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/abstract-arc/transition-place-arc';
import {RegularPlaceTransitionArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/regular-place-transition-arc';
import {ResetArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/reset-arc';
import {InhibitorArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/inhibitor-arc';
import {ReadArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/read-arc';
import {RegularTransitionPlaceArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/regular-transition-place-arc';
import {PetriflowArcElement} from '../svg-elements/PetriflowArcElement';

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

    createPlace(marking: number, position: DOMPoint): Place {
        const place = new Place(`p${this._placeIdCounter++}`, `p${this._placeIdCounter}`, marking, position);
        const petriflowPlace = new PetriflowPlace(place);
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElements.push(petriflowPlace);
        return place;
    }

    createStaticPlace(marking: number, position: DOMPoint): StaticPlace {
        const place = new StaticPlace(`p${this._placeIdCounter++}`, `p${this._placeIdCounter}`, marking, position);
        const staticPetriflowPlace = new PetriflowPlace(place);
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElements.push(staticPetriflowPlace);
        return place;
    }

    createTransition(position: DOMPoint, icon?: string): Transition {
        const transition = new Transition(`t${this._transitionIdCounter++}`, `t${this._transitionIdCounter}`, position, icon);
        const petriflowTransition = new PetriflowTransition(transition);
        this._petriflowCanvasService.canvas.add(transition);
        this._petriflowCanvasService.petriflowElements.push(petriflowTransition);
        return transition;
    }

    addArc(element: NodeElement, type: string): Arc | SVGElement {
        if (this._source instanceof Place) {
            switch (type) {
                case 'arc': {
                    return this.createArcByGenericType(element, RegularPlaceTransitionArc, RegularPlaceTransitionArc.ID);
                }
                case 'resetarc': {
                    return this.createArcByGenericType(element, ResetArc, ResetArc.ID);
                }
                case 'inhibitor': {
                    return this.createArcByGenericType(element, InhibitorArc, InhibitorArc.ID);
                }
                case 'read': {
                    return this.createArcByGenericType(element, ReadArc, ReadArc.ID);
                }
            }
        } else if (type === 'arc') {
            return this.createArcByGenericType(element, RegularTransitionPlaceArc, RegularPlaceTransitionArc.ID);
        }
    }

    private createArcByGenericType<T extends PlaceTransitionArc | TransitionPlaceArc>(element: NodeElement, type: new(...args) => T, arrow: string): Arc | SVGElement {
        if (!this._arcLine) {
            this._source = element;
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source.constructor) {
            this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);
            this.arcLine = undefined;
            const arc: T = this.createArc(type, this._source, element, []);
            this._petriflowCanvasService.canvas.add(arc);
            const petriflowArc = new PetriflowArcElement(arc);
            this._petriflowCanvasService.petriflowElements.push(petriflowArc);
            this._source = undefined;
            return arc;
        }
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

    createArc<T>(type: new(...args) => T, ...params): T {
        return new type(...params);
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
