export interface Selectable<T> {
    select(): void;

    deselect(): void;

    clone(): T;

    moveBy(x: number, y: number): void;

    isEnclosedByRectangle(rectangle: SVGRect): boolean;

    activate(): void;

    getContainer(): SVGGElement;
}
