import { Entity, EntityOptions } from './entity';
import { Splash, SplashesOptions } from './splash';
export interface MatrixOptions {
    font: Font;
    symbols?: () => string;
    splash?: SplashesOptions;
    entity?: EntityOptions;
    autoresize?: boolean;
    tracesCount?: number;
}
interface Font {
    family: string;
    file: string;
    size: number;
    colors: string[];
}
export declare class Matrix {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    font: FontFace;
    entity: Entity;
    splash: Splash;
    target: HTMLElement;
    fontSize: number;
    tracesCount: number;
    autoresize: boolean;
    running: boolean;
    colors: string[];
    traces: number[];
    symbols: (() => string) | undefined;
    constructor(container: HTMLElement, opts: MatrixOptions);
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
    randomColor(): string;
    private setSize;
    private initTraces;
    private render;
}
export {};
