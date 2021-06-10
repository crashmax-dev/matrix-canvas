declare type HTMLTarget = HTMLElement | Element;
interface MatrixOptions {
    target: HTMLTarget;
    font: Font;
    symbols?: () => string;
    autoresize?: boolean;
    tracesCount?: number;
}
interface Font {
    family: string;
    file: string;
    size: number;
}
interface Sizes {
    width?: number;
    height?: number;
}
export declare class Matrix {
    private _target;
    private _canvas;
    private _ctx;
    private _font;
    private _fontSize;
    private _tracesCount;
    private _autoresize;
    private _running;
    private _colors;
    private _traces;
    private _symbols;
    constructor(options: MatrixOptions);
    get inRunning(): boolean;
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
    size({ width, height }?: Sizes): void;
    private initTraces;
    private randomInt;
    private randomColor;
    private render;
}
export {};
