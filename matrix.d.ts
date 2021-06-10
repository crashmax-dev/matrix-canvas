declare type HTMLTarget = HTMLElement | Element;
interface MatrixOptions {
    target: HTMLTarget;
    font: Font;
    symbols?: () => string;
    splashes?: Splashes;
    autoresize?: boolean;
    tracesCount?: number;
}
interface Splashes {
    interval: number;
    enable: boolean;
    colors: string[];
    texts: string[];
    size: number;
}
interface Font {
    family: string;
    file: string;
    size: number;
    colors: string[];
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
    private _splashInterval;
    private _splashes;
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
    private randomSplash;
    private startSplash;
    private stopSplash;
    private renderSplash;
    private render;
}
export {};
