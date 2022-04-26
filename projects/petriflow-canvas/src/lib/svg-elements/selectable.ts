export interface Selectable<T> {
    select(): void;

    deselect(): void;

    moveBy(x: number, y: number): void;

    isEnclosedByRectangle(rectangle: SVGRect): boolean;

    activate(): void;

    getContainer(): SVGGElement;

    isSelected(): boolean;

    setSelected(value: boolean): void;
}
