export interface Selectable<T> {
    select(): void;

    deselect(): void;

    copy(): T;

    getPosition(): DOMPoint;

    move(position: DOMPoint): void;
}
