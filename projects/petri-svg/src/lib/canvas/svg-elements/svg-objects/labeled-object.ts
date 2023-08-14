import { CanvasConfiguration } from '../../canvas-configuration';
import {Movable} from '../movable';
import {NodeElement} from './node-element';

export abstract class LabeledObject extends NodeElement implements Movable {

    private _id: string;
    private _labelElement: SVGTextElement;
    private _label: Text;
    private _labelBackground: SVGRectElement;

    protected constructor(id: string, label: string, position: DOMPoint) {
        super(position);
        this._labelBackground = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'rect') as SVGRectElement;
        this._labelBackground.setAttributeNS(null, 'width', '0');
        this._labelBackground.setAttributeNS(null, 'height', `${CanvasConfiguration.FONT.SIZE}`);
        this._labelBackground.setAttributeNS(null, 'fill-opacity', '0.7');
        this._labelBackground.setAttributeNS(null, 'fill', 'white');
        this.container.appendChild(this._labelBackground);

        this._labelElement = (document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'text') as unknown) as SVGTextElement;
        this._labelElement.setAttributeNS(null, 'font-size', String(CanvasConfiguration.FONT.SIZE));
        this._labelElement.setAttributeNS(null, 'font-family', CanvasConfiguration.FONT.FAMILY);
        this._labelElement.setAttributeNS(null, 'text-anchor', 'middle');
        this._label = document.createTextNode(label);
        this._labelElement.appendChild(this._label);

        this._id = id;
        this.container.appendChild(this._labelElement);

        this.setLabelElementPosition(position);
    }

    getElements(): Array<SVGElement> {
        const elements = super.getElements();
        elements.push(this.labelElement);
        elements.push(this.labelBackground);
        return elements;
    }

    private setLabelElementPosition(position: DOMPoint) {
        this._labelElement.setAttributeNS(null, 'x', `${position.x}`);
        this._labelElement.setAttributeNS(null, 'y', `${position.y + CanvasConfiguration.SIZE}`);
        this._labelBackground.setAttributeNS(null, 'x', `${position.x}`);
        this._labelBackground.setAttributeNS(null, 'y', `${position.y + CanvasConfiguration.SIZE}`);
    }

    activate() {
        super.activate();
        this._labelElement.setAttributeNS(null, 'class', 'svg-active-fill');
    }

    deactivate() {
        super.deactivate();
        this._labelElement.setAttributeNS(null, 'class', 'svg-inactive-fill');
    }

    move(position: DOMPoint): void {
        super.move(position);
        this.setLabelElementPosition(position);
    }

    get labelElement(): SVGTextElement {
        return this._labelElement;
    }

    set labelElement(value: SVGTextElement) {
        this._labelElement = value;
    }

    get label(): Text {
        return this._label;
    }

    set label(value: Text) {
        this._label = value;
    }

    get labelBackground(): SVGRectElement {
        return this._labelBackground;
    }

    set labelBackground(value: SVGRectElement) {
        this._labelBackground = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
        this._label.textContent = value;
    }
}
