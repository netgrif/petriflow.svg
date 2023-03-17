import {CanvasEventType} from "./canvas-event-type";
import {PetriflowCanvasElement} from "../svg-elements/petriflow-canvas-element";

export interface CanvasEventWrapper {

    element: PetriflowCanvasElement;

    eventType: CanvasEventType;
}
