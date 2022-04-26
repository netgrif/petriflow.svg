import {Injectable} from '@angular/core';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowPlace} from '../svg-elements/petriflow-place';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';
import {PetriflowStaticPlace} from '../svg-elements/petriflow-static-place';
import {PetriflowTransition} from '../svg-elements/petriflow-transition';
import {PetriflowPlaceTransitionArc} from '../svg-elements/arcs/petriflow-place-transition-arc';
import {PetriflowTransitionPlaceArc} from '../svg-elements/arcs/petriflow-transition-place-arc';
import {PetriflowResetArc} from '../svg-elements/arcs/petriflow-reset-arc';
import {PetriflowReadArc} from '../svg-elements/arcs/petriflow-read-arc';
import {PetriflowInhibitorArc} from '../svg-elements/arcs/petriflow-inhibitor-arc';
import {SelectableArc} from '../svg-elements/selectable-arc';
import {SelectableNode} from '../svg-elements/selectable-node';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasFactoryService {

    private _transitionIdCounter = 0;
    private _placeIdCounter = 0;
    private _arcIdCounter = 0;

    private _source: SelectableNode;
    private _arcLine: SVGElement;

    constructor(private _petriflowCanvasService: PetriflowCanvasService) {
    }

    createPlace(marking: number, position: DOMPoint, addToElements = true): PetriflowPlace {
        const place = new PetriflowPlace(marking, position);
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElementsCollection.places.push(place);
        return place;
    }

    createStaticPlace(marking: number, position: DOMPoint, addToElements = true): PetriflowStaticPlace {
        const place = new PetriflowStaticPlace(marking, position);
        this._petriflowCanvasService.canvas.add(place);
        this._petriflowCanvasService.petriflowElementsCollection.places.push(place);
        return place;
    }

    createTransition(position: DOMPoint, icon?: string, addToElements = true): PetriflowTransition {
        const transition = new PetriflowTransition(position, icon);
        this._petriflowCanvasService.canvas.add(transition);
        this._petriflowCanvasService.petriflowElementsCollection.transitions.push(transition);
        return transition;
    }

    addArc(element: SelectableNode, type: string): SelectableArc | SVGElement {
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

    private createArcByGenericType<T extends SelectableArc>(element: SelectableNode, type: new(...args) => T, arrow: string): SelectableArc | SVGElement {
        if (!this._arcLine) {
            this._source = element;
            return this.createSvgArc(element, arrow);
        } else if (element.constructor !== this._source.constructor) {
            this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);
            this.arcLine = undefined;
            const arc: T = this.createArc(type, this._source, element, []);

            this._petriflowCanvasService.canvas.container.appendChild(arc.getContainer());
            this._petriflowCanvasService.petriflowElementsCollection.arcs.push(arc);
            this._source = undefined;
            this._arcLine = undefined;
            return arc;
        }
    }

    createArc<T>(type: new(...args) => T, ...params): T {
        return new type(...params);
    }

    createSvgArc(element: SelectableNode, arrowUrl: string): SVGElement {
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

    get source(): SelectableNode {
        return this._source;
    }

    set source(value: SelectableNode) {
        this._source = value;
    }
}
