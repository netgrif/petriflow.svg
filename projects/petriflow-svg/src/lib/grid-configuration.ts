import {CanvasConfiguration} from '@netgrif/petri.svg';

export class GridConfiguration {
    public size: number = CanvasConfiguration.SIZE;
    public stroke: string = '#ccc';
    public enabled: boolean = true;
    public width: number = CanvasConfiguration.WIDTH;
    public height: number = CanvasConfiguration.HEIGHT;
}
