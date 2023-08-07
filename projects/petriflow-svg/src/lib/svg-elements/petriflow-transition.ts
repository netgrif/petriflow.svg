import {PetriflowNode} from './petriflow-node';
import {CanvasConfiguration, Transition} from '@netgrif/petri.svg';
import {PetriflowCanvasConfiguration} from '../petriflow-canvas-configuration';
import {PetriflowNodeClickEventFunction} from '../common';

export class PetriflowTransition extends PetriflowNode<Transition> {

    private _finishArrow: SVGPolygonElement;
    private _cancelArrow: SVGPolygonElement;
    private _iconElement: SVGTextElement | undefined;
    private _icon: Text | undefined;

    constructor(transition: Transition, icon?: string) {
        super(transition);

        this.canvasElement.element.onmouseenter = () => {
            this.activate();
        };
        this.canvasElement.element.onmouseleave = () => {
            if (!this.isSelected()) {
                this.deactivate();
            }
        };

        this._cancelArrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        this._cancelArrow.id = `svg_transition_start_${transition.id}`;
        this._cancelArrow.setAttributeNS(null, 'fill', 'white');
        this._cancelArrow.setAttributeNS(null, 'stroke', 'white');
        this._cancelArrow.setAttributeNS(null, 'stroke-width', '2');
        this._cancelArrow.setAttributeNS(null, 'points', this.canvasElement.cancelArrowPoints(transition.position));
        this.canvasElement.container.appendChild(this._cancelArrow);

        this._finishArrow = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'polygon') as SVGPolygonElement;
        this._finishArrow.id = `svg_transition_finish_${transition.id}`;
        this._finishArrow.setAttributeNS(null, 'fill', 'white');
        this._finishArrow.setAttributeNS(null, 'stroke', 'white');
        this._finishArrow.setAttributeNS(null, 'stroke-width', '2');
        this._finishArrow.setAttributeNS(null, 'points', this.canvasElement.finishArrowPoints(transition.position));
        this.canvasElement.container.appendChild(this._finishArrow);

        this.setIcon(icon);

        this.deactivate();
    }

    setIcon(icon: string | undefined) {
        this.removeIcon();
        if (!!icon) {
            this.addIcon(icon);
        }
    }

    addIcon(icon: string) {
        this._iconElement = (document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'text') as unknown) as SVGTextElement;
        this._iconElement.setAttributeNS(null, 'x', String(this.canvasElement.position.x - CanvasConfiguration.ICON_SIZE / 2));
        this._iconElement.setAttributeNS(null, 'y', String(this.canvasElement.position.y + CanvasConfiguration.ICON_SIZE / 2));
        this._iconElement.setAttributeNS(null, 'style', `font-family: Material Icons;font-size:${CanvasConfiguration.ICON_SIZE}`);
        this._icon = document.createTextNode(icon);
        this._iconElement.appendChild(this._icon);

        this._iconElement.onmouseenter = () => {
            this.activate();
        };
        this._iconElement.onmouseleave = () => {
            if (!this.isSelected()) {
                this.deactivate();
            }
        };
        this._iconElement.onclick = this.canvasElement.element.onclick;
        this._iconElement.oncontextmenu = this.canvasElement.element.oncontextmenu;

        this.canvasElement.container.appendChild(this._iconElement);
    }

    removeIcon() {
        if (!!this._iconElement) {
            this.canvasElement.container.removeChild(this._iconElement);
            this._icon = undefined;
            this._iconElement = undefined;
        }
    }

    setOnClick(event: PetriflowNodeClickEventFunction): void {
        this.onClickEvent = event;
        this.canvasElement.element.onclick = (mouseEvent: Event | undefined) => {
            event(this, mouseEvent);
        };
        if (!!this._iconElement) {
            this._iconElement.onclick = (mouseEvent: Event | undefined) => {
                event(this, mouseEvent);
            }
        }
    }

    setOnContext(event: PetriflowNodeClickEventFunction): void {
        this.onContextEvent = event;
        this.canvasElement.element.oncontextmenu = (mouseEvent: Event | undefined) => {
            event(this, mouseEvent);
        }
        if (!!this._iconElement) {
            this._iconElement.oncontextmenu = (mouseEvent: Event | undefined) => {
                event(this, mouseEvent);
            }
        }
    }

    moveBy(x: number, y: number): void {
        super.moveBy(x, y);
        this._iconElement?.setAttributeNS(null, 'x', String(this.canvasElement.position.x - CanvasConfiguration.ICON_SIZE / 2));
        this._iconElement?.setAttributeNS(null, 'y', String(this.canvasElement.position.y + CanvasConfiguration.ICON_SIZE / 2));
        this._cancelArrow.setAttributeNS(null, 'points', this.canvasElement.cancelArrowPoints(this.canvasElement.position));
        this._finishArrow.setAttributeNS(null, 'points', this.canvasElement.finishArrowPoints(this.canvasElement.position));
    }

    move(position: DOMPoint) {
        this.canvasElement.move(position);
        this._cancelArrow.setAttributeNS(null, 'points', this.canvasElement.cancelArrowPoints(position));
        this._finishArrow.setAttributeNS(null, 'points', this.canvasElement.finishArrowPoints(position));
        if (this._iconElement) {
            this.setIconElementPosition(position);
        }
    }

    activate(): void {
        this.canvasElement.activate();
        // this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-active');
        // this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-active');
        this._iconElement?.setAttributeNS(null, 'class', 'svg-active-fill');
    }

    deactivate(): void {
        this.canvasElement.deactivate();
        this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-inactive');
        this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-inactive');
        this._iconElement?.setAttributeNS(null, 'class', 'svg-inactive-fill');
    }

    private setIconElementPosition(position: DOMPoint) {
        if (this._iconElement) {
            this._iconElement.setAttributeNS(null, 'x', `${position.x - CanvasConfiguration.ICON_SIZE / 2}`);
            this._iconElement.setAttributeNS(null, 'y', `${position.y + CanvasConfiguration.ICON_SIZE / 2}`);
        }
    }

    public enable(firing: boolean) {
        this.canvasElement.enable(firing);
        this.setIconFiringClass(firing);
    }

    public disable(firing: boolean) {
        this.canvasElement.disable();
        this.setIconFiringClass(firing);
    }

    private setIconFiringClass(firing: boolean) {
        if (firing) {
            this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-active');
            this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-active');
            this._iconElement?.setAttributeNS(null, 'class', 'svg-icon-inactive');
        } else {
            // TODO: PF-48 - global active/inactive static strings
            this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-inactive');
            this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-inactive');
            this._iconElement?.setAttributeNS(null, 'class', 'svg-icon-active');
        }
    }

    deselect(): void {
        this.setSelected(false);
        this.deactivate();
        this._iconElement?.setAttributeNS(null, 'class', 'svg-inactive-fill');
    }

    select(): void {
        this.setSelected(true);
        this.activate();
        this._iconElement?.setAttributeNS(null, 'class', 'svg-active-fill');
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

    get iconElement(): SVGTextElement | undefined {
        return this._iconElement;
    }

    set iconElement(value: SVGTextElement | undefined) {
        this._iconElement = value;
    }

    get icon(): Text | undefined {
        return this._icon;
    }

    set icon(value: Text | undefined) {
        this._icon = value;
    }

    clone(): PetriflowTransition {
        const cloned = new PetriflowTransition(this.canvasElement.clone() as Transition, this.icon?.wholeText);
        cloned.setOnClick((clone) => this.onClickEvent(clone));
        cloned.setOnContext((clone) => this.onContextEvent(clone));
        cloned.changeId(`t${++PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER}`);
        return cloned;
    }

    changeId(id: string): void {
        this.canvasElement.id = `svg_transition_${id}`;
        this.canvasElement.label.textContent = id;
    }
}
