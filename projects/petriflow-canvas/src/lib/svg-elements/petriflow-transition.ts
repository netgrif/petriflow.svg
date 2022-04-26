import {Transition} from 'projects/canvas/src/lib/canvas/svg-elements/transition/transition';
import {SelectableNode} from './selectable-node';
import {CanvasConfiguration} from '../../../../canvas/src/lib/canvas/canvas-configuration';

export class PetriflowTransition extends Transition implements SelectableNode {

    private static COUNTER = 0;
    private _finishArrow: SVGPolygonElement;
    private _cancelArrow: SVGPolygonElement;
    private _iconElement: SVGTextElement;
    private _icon: Text;

    private _onClickEvent;

    constructor(position: DOMPoint, icon?: string) {
        super(`t${PetriflowTransition.COUNTER++}`, `t${PetriflowTransition.COUNTER}`, position);
        const id = `t${PetriflowTransition.COUNTER}`;
        this._cancelArrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        this._cancelArrow.id = `svg_transition_start_${id}`;
        this._cancelArrow.setAttributeNS(null, 'fill', 'white');
        this._cancelArrow.setAttributeNS(null, 'stroke', 'white');
        this._cancelArrow.setAttributeNS(null, 'stroke-width', '2');
        this.container.appendChild(this._cancelArrow);

        this._finishArrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        this._finishArrow.id = `svg_transition_finish_${id}`;
        this._finishArrow.setAttributeNS(null, 'fill', 'white');
        this._finishArrow.setAttributeNS(null, 'stroke', 'white');
        this._finishArrow.setAttributeNS(null, 'stroke-width', '2');
        this.container.appendChild(this._finishArrow);

        if (icon) {
            this._iconElement = (document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'text') as unknown) as SVGTextElement;
            this._iconElement.setAttributeNS(null, 'style', `font-family: Material Icons;font-size:${CanvasConfiguration.ICON_SIZE}`);
            this._icon = document.createTextNode(icon);
            this._iconElement.appendChild(this._icon);
            this.container.appendChild(this._iconElement);
        }
        this.move(position);
        this.deactivate();

        this.element.onmouseenter = () => {
            this.activate();
        };
        this.element.onmouseleave = () => {
            if (!this.isSelected()) {
                this.deactivate();
            }
        };
    }

    move(position: DOMPoint) {
        super.move(position);
        this._cancelArrow.setAttributeNS(null, 'points', this.cancelArrowPoints(position));
        this._finishArrow.setAttributeNS(null, 'points', this.finishArrowPoints(position));
        if (this._iconElement) {
            this.setIconElementPosition(position);
        }
    }

    activate(): void {
        super.activate();
        // this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-active');
        // this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-active');
    }

    deactivate(): void {
        super.deactivate();
        this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-inactive');
        this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-inactive');
    }

    private setIconElementPosition(position: DOMPoint) {
        this._iconElement.setAttributeNS(null, 'x', `${position.x - CanvasConfiguration.ICON_SIZE / 2}`);
        this._iconElement.setAttributeNS(null, 'y', `${position.y + CanvasConfiguration.ICON_SIZE / 2}`);
    }

    setEnabled(firing: boolean) {
        super.setEnabled(firing);
        this.setIconFiringClass(firing);

    }

    setDisabled(firing: boolean) {
        super.setDisabled(firing);
        this.setIconFiringClass(firing);
    }

    private setIconFiringClass(firing: boolean) {
        if (firing) {
            this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-active');
            this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-active');
            this._iconElement?.setAttributeNS(null, 'class', 'svg-icon-inactive');
        } else {
            this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-inactive');
            this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-inactive');
            this._iconElement?.setAttributeNS(null, 'class', 'svg-icon-active');
        }
    }

    deselect(): void {
        this.setSelected(false);
        this.deactivate();
    }

    select(): void {
        this.setSelected(true);
        this.activate();
    }

    getPosition(): DOMPoint {
        return this.position;
    }

    getContainer(): SVGGElement {
        return this.container;
    }

    get finishArrow(): SVGPolygonElement {
        return this._finishArrow;
    }

    set finishArrow(value: SVGPolygonElement) {
        this._finishArrow = value;
    }

    get cancelArrow(): SVGPolygonElement {
        return this._cancelArrow;
    }

    set cancelArrow(value: SVGPolygonElement) {
        this._cancelArrow = value;
    }

    get iconElement(): SVGTextElement {
        return this._iconElement;
    }

    set iconElement(value: SVGTextElement) {
        this._iconElement = value;
    }

    get icon(): Text {
        return this._icon;
    }

    set icon(value: Text) {
        this._icon = value;
    }

    clone(): PetriflowTransition {
        const cloned = new PetriflowTransition(this.position, this.icon?.textContent);
        cloned.element.onclick = () => this._onClickEvent(cloned);
        cloned.setOnClick((clone) => this._onClickEvent(clone));
        return cloned;
    }

    setOnClick(event: (element) => void): void {
        this._onClickEvent = event;
        this.element.onclick = () => {
            event(this);
        };
    }
}
