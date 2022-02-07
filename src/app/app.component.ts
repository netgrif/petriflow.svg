import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Canvas} from './canvas/canvas';
import {Place} from './canvas/svg-elements/place/place';
import {Transition} from './canvas/svg-elements/transition/transition';
import {RegularPlaceTransitionArc} from './canvas/svg-elements/arc/regular-place-transition-arc';
import {RegularTransitionPlaceArc} from './canvas/svg-elements/arc/regular-transition-place-arc';
import {ReadArc} from './canvas/svg-elements/arc/read-arc';
import {InhibitorArc} from './canvas/svg-elements/arc/inhibitor-arc';
import {ResetArc} from './canvas/svg-elements/arc/reset-arc';

@Component({
    selector: 'nab-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef;
    private canvas: Canvas;

    ngAfterViewInit() {
        this.canvas = new Canvas(this.canvasElement.nativeElement);

        const places = [];
        const transitions = [];
        for (let i = 0; i < 11; i++) {
            const place = new Place(`p${i}`, `p${i}`, i, new DOMPoint(40, 60 * (1 + i)));
            const transition = new Transition(`t${i}`, `t${i}`, new DOMPoint(240, 60 * (i + 1)));
            this.canvas.add(place);
            this.canvas.add(transition);
            places.push(place);
            transitions.push(transition);
        }
        this.canvas.add(new RegularPlaceTransitionArc(places[0], transitions[0]));
        this.canvas.add(new RegularTransitionPlaceArc(transitions[1], places[1]));
        this.canvas.add(new ReadArc(places[2], transitions[2]));
        this.canvas.add(new InhibitorArc(places[3], transitions[3]));
        this.canvas.add(new ResetArc(places[4], transitions[4]));

        console.log(new Place('', '', 0, new DOMPoint(100, 100)).getEdgeIntersection(new DOMPoint(100, 150)));
    }
}
