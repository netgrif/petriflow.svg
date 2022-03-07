import {Place} from './place';

export class StaticPlace extends Place {

    activate() {
        super.activate();
        this.setStaticPlaceAttributes();
    }

    deactivate() {
        super.deactivate();
        this.setStaticPlaceAttributes();
    }

    private setStaticPlaceAttributes() {
        this.element.setAttributeNS(null, 'class', 'svg-inactive-stroke');
        this.element.setAttributeNS(null, 'fill', 'white');
        this.element.setAttributeNS(null, 'stroke-dasharray', '14, 5');
        this.element.setAttributeNS(null, 'stroke-width', '3');
    }
}
