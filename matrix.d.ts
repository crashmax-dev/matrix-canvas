/// <reference types="css-font-loading-module" />
import { Flying, FlyingsOptions } from './flying';
import { Splash, SplashesOptions } from './splash';
declare type HTMLTarget = HTMLElement | Element;
interface MatrixOptions {
    target: HTMLTarget;
    font: Font;
    symbols?: () => string;
    splashes?: SplashesOptions;
    flyings?: FlyingsOptions;
    autoresize?: boolean;
    tracesCount?: number;
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
    flying: Flying;
    splash: Splash;
    target: HTMLTarget;
    fontSize: number;
    tracesCount: number;
    autoresize: boolean;
    running: boolean;
    colors: string[];
    traces: number[];
    symbols: (() => string) | undefined;
    constructor(options: MatrixOptions);
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
    randomColor(): string;
    private setSize;
    private initTraces;
    private render;
}
export { Matrix, MatrixOptions };
