export interface PetriflowCanvasElement {
    // TODO: PF-48 remove select/deselect
    select(): void;

    deselect(): void;

    moveBy(x: number, y: number): void;

    isEnclosedByRectangle(rectangle: SVGRect): boolean;

    activate(): void;

    isSelected(): boolean;

    setSelected(value: boolean): void;

}
