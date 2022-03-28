import {Injectable} from '@angular/core';
import {Place} from 'projects/canvas/src/lib/canvas/svg-elements/place/place';
import {PetriflowCanvasService} from '../petriflow-canvas.service';
import {PetriflowPlace} from '../svg-elements/PetriflowPlace';
import {StaticPlace} from '../../../../canvas/src/lib/canvas/svg-elements/place/static-place';
import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {PetriflowTransition} from '../svg-elements/PetriflowTransition';

@Injectable({
    providedIn: 'root'
})
export class PetriflowCanvasFactoryService {

    private readonly arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];
    private _transitionIdCounter = 0;
    private _placeIdCounter = 0;
    private _arcIdCounter = 0;

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

    // createArc(): Arc {
    //
    // }

    createArcByGenericType<T>(type: new(...args) => T, ...params): T {
        return new type(...params);
    }

}
