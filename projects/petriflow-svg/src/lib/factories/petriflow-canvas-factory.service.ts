import {Injectable} from '@angular/core';
import {
    Arc,
    CanvasConfiguration,
    InhibitorArc,
    NodeElement,
    Place,
    ReadArc,
    RegularPlaceTransitionArc,
    RegularTransitionPlaceArc,
    ResetArc,
    StaticPlace,
    Transition
} from '@netgrif/petri.svg';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowPlaceTransitionArc} from '../svg-elements/arcs/petriflow-place-transition-arc';
import {PetriflowTransitionPlaceArc} from '../svg-elements/arcs/petriflow-transition-place-arc';
import {PetriflowResetArc} from '../svg-elements/arcs/petriflow-reset-arc';
import {PetriflowReadArc} from '../svg-elements/arcs/petriflow-read-arc';
import {PetriflowInhibitorArc} from '../svg-elements/arcs/petriflow-inhibitor-arc';
import {PetriflowNode} from '../svg-elements/petriflow-node';
import {PetriflowArc} from '../svg-elements/petriflow-arc';
import {PetriflowCanvasConfiguration} from '../petriflow-canvas-configuration';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasFactoryService {

    private _source: PetriflowNode<NodeElement> | undefined;
    private _arcLine: SVGElement | undefined;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
    }

    createPlace(marking: number, position: DOMPoint): PetriflowPlace {
        const place = new Place(`p${++PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`, `p${PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`, marking, position);
        const petriflowPlace = new PetriflowPlace(place);
        if (!this._petriflowCanvasService.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);
        return petriflowPlace;
    }

    createStaticPlace(marking: number, position: DOMPoint): PetriflowPlace {
        const place = new StaticPlace(`p${++PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`, `p${PetriflowCanvasConfiguration.PLACE_ID_COUNTER}`, marking, position);
        const petriflowPlace = new PetriflowPlace(place);
        if (!this._petriflowCanvasService.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);
        return petriflowPlace;
    }

    createTransition(position: DOMPoint, icon?: string): PetriflowTransition {
        const transition = new Transition(`t${++PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`, `t${PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`, position);
        const petriflowTransition = new PetriflowTransition(transition, icon);
        if (!this._petriflowCanvasService.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
        this._petriflowCanvasService.canvas.add(transition);
        this._petriflowCanvasService.petriflowElementsCollection.transitions.push(petriflowTransition);
        return petriflowTransition;
    }

    addArc(element: PetriflowNode<NodeElement>, type: string): PetriflowArc<Arc> | SVGElement | undefined {
        if (!this._source) return undefined;
        if (this._source.canvasElement instanceof Place) {
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
                default: {
                    return undefined;
                }
            }
        } else if (type === 'arc') {
            return this.createArcByGenericType(element, PetriflowTransitionPlaceArc, RegularTransitionPlaceArc, RegularTransitionPlaceArc.ID);
        } else {
            return undefined;
        }
    }

    // @ts-ignore
    private createArcByGenericType<T extends PetriflowArc<Arc>, A extends Arc>(element: PetriflowNode<NodeElement>, type: new(...args) => T, typeArc: new(...args) => A, arrow: string): PetriflowArc<Arc> | SVGElement | undefined {
        if (!this._arcLine) {
            this._source = element;
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source?.constructor) {
            if (!this._petriflowCanvasService.canvas)
                throw new Error("SVG canvas for petriflow objects doesn't exists!");
            if(!this.arcLine) return undefined;
            this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);
            this.arcLine = undefined;
            const arc: A = this.createArc(typeArc, this._source?.canvasElement, element.canvasElement, []);
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
        if (!this._petriflowCanvasService.canvas)
            throw new Error("SVG canvas for petriflow objects doesn't exists!");
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

    get arcLine(): SVGElement | undefined {
        return this._arcLine;
    }

    set arcLine(value: SVGElement | undefined) {
        this._arcLine = value;
    }

    get source(): PetriflowNode<NodeElement> | undefined {
        return this._source;
    }

    set source(value: PetriflowNode<NodeElement> | undefined) {
        this._source = value;
    }
}
