import {Injectable} from '@angular/core';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowPlaceTransitionArc} from '../svg-elements/arcs/petriflow-place-transition-arc';
import {PetriflowTransitionPlaceArc} from '../svg-elements/arcs/petriflow-transition-place-arc';
import {PetriflowResetArc} from '../svg-elements/arcs/petriflow-reset-arc';
import {PetriflowReadArc} from '../svg-elements/arcs/petriflow-read-arc';
import {PetriflowInhibitorArc} from '../svg-elements/arcs/petriflow-inhibitor-arc';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {NodeElement} from '../../../../canvas/src/lib/canvas/svg-elements/svg-objects/node-element';
import {StaticPlace} from '../../../../canvas/src/lib/canvas/svg-elements/place/static-place';
import {Transition} from '../../../../canvas/src/lib/canvas/svg-elements/transition/transition';
import {PetriflowArc} from '../svg-elements/petriflow-arc';
import {Arc} from 'projects/canvas/src/lib/canvas/svg-elements/arc/abstract-arc/arc';
import {InhibitorArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/inhibitor-arc';
import {ResetArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/reset-arc';
import {RegularPlaceTransitionArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/regular-place-transition-arc';
import {ReadArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/read-arc';
import {RegularTransitionPlaceArc} from '../../../../canvas/src/lib/canvas/svg-elements/arc/regular-transition-place-arc';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasFactoryService {

    private _transitionIdCounter = 0;
    private _placeIdCounter = 0;
    private _arcIdCounter = 0;

    private _source: PetriflowNode<NodeElement>;
    private _arcLine: SVGElement;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
    }

    createPlace(marking: number, position: DOMPoint): PetriflowPlace {
        const place = new Place(`p${this._placeIdCounter++}`, `p${this._placeIdCounter}`, marking, position);
        const petriflowPlace = new PetriflowPlace(place);
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);
        return petriflowPlace;
    }

    createStaticPlace(marking: number, position: DOMPoint): PetriflowPlace {
        const place = new StaticPlace(`p${this._placeIdCounter++}`, `p${this._placeIdCounter}`, marking, position);
        const petriflowPlace = new PetriflowPlace(place);
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);
        return petriflowPlace;
    }

    createTransition(position: DOMPoint, icon?: string): PetriflowTransition {
        const transition = new Transition(`t${this._transitionIdCounter++}`, `t${this._transitionIdCounter}`, position);
        const petriflowTransition = new PetriflowTransition(transition, icon);
        this._petriflowCanvasService.canvas.add(transition);
        this._petriflowCanvasService.petriflowElementsCollection.transitions.push(petriflowTransition);
        return petriflowTransition;
    }

    addArc(element: PetriflowNode<NodeElement>, type: string): PetriflowArc<Arc> | SVGElement {
        if (this._source instanceof Place) {
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
            }
        } else if (type === 'arc') {
            return this.createArcByGenericType(element, PetriflowTransitionPlaceArc, RegularTransitionPlaceArc, RegularTransitionPlaceArc.ID);
        }
    }

    private createArcByGenericType<T extends PetriflowArc<Arc>, A extends Arc>(element: PetriflowNode<NodeElement>, type: new(...args) => T, typeArc: new(...args) => A, arrow: string): PetriflowArc<Arc> | SVGElement {
        if (!this._arcLine) {
            this._source = element;
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source.constructor) {
            this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);
            this.arcLine = undefined;
            const arc: A = this.createArc(typeArc, this._source.element, element.element, []);
            const petriflowArc: T = this.createArc(type, arc);

            this._petriflowCanvasService.canvas.container.appendChild(arc.container);
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(petriflowArc);
            this._source = undefined;
            this._arcLine = undefined;
            return petriflowArc;
        }
    }

    createArc<T>(type: new(...args) => T, ...params): T {
        return new type(...params);
    }

    createSvgArc(element: PetriflowNode<NodeElement>, arrowUrl: string): SVGElement {
        const arcLine = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polyline') as SVGPolylineElement;
        arcLine.setAttributeNS(null, 'fill', 'none');
        arcLine.setAttributeNS(null, 'stroke', 'black');
        arcLine.setAttributeNS(null, 'stroke-width', '2');
        arcLine.setAttributeNS(null, 'marker-end', `url(#${arrowUrl})`);
        arcLine.setAttributeNS(null, 'points', `${element.getPosition().x},${element.getPosition().y} ${element.getPosition().x},${element.getPosition().y}`);
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

    get source(): PetriflowNode<NodeElement> {
        return this._source;
    }

    set source(value: PetriflowNode<NodeElement>) {
        this._source = value;
    }
}
