import { Entity, EntityOptions } from './entity';
import { Splash, SplashOptions } from './splash';
export type { SplashOptions, EntityOptions };
export interface MatrixOptions {
    font: Font;
    symbols?: () => string;
    splash?: SplashOptions;
    entity?: EntityOptions;
    autoresize?: boolean;
    tracesCount?: number;
}
export interface Font {
    family: string;
    file: string;
    size: number;
    colors: string[];
}
export interface Sizes {
    width?: number;
    height?: number;
}
export declare class Matrix {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    font: FontFace;
    entity: Entity;
    splash: Splash;
    private target;
    private fontSize;
    private tracesCount;
    private autoresize;
    private running;
    private colors;
    private traces;
    private symbols;
    constructor(container: HTMLElement, opts: MatrixOptions);
    get isRunning(): boolean;
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
    randomColor(): string;
    private setSize;
    private initTraces;
    private render;
}
