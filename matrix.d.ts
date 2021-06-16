/// <reference types="css-font-loading-module" />
import { Entity, EntityOptions } from './entity';
import { Splash, SplashesOptions } from './splash';
declare type HTMLTarget = HTMLElement | Element;
interface MatrixOptions {
    font: Font;
    symbol?: () => string;
    splash?: SplashesOptions;
    entity?: EntityOptions;
    autoresize?: boolean;
    tracesCount?: number;
    fpsMonitor?: boolean;
}
interface Font {
    family: string;
    file: string;
    size: number;
    colors: string[];
}
declare class Matrix {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    font: FontFace;
    entity: Entity;
    splash: Splash;
    target: HTMLTarget;
    fontSize: number;
    tracesCount: number;
    autoresize: boolean;
    running: boolean;
    colors: string[];
    traces: number[];
    symbols: (() => string) | undefined;
    constructor(container: HTMLTarget, opts: MatrixOptions);
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
    randomColor(): string;
    private setSize;
    private initTraces;
    private render;
}
export { Matrix, MatrixOptions, HTMLTarget };
