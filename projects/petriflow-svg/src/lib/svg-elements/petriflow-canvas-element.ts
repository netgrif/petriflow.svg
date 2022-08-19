export interface PetriflowCanvasElement {
    select(): void;

    deselect(): void;

    moveBy(x: number, y: number): void;

    isEnclosedByRectangle(rectangle: SVGRect): boolean;

    activate(): void;

    isSelected(): boolean;

    setSelected(value: boolean): void;

}
