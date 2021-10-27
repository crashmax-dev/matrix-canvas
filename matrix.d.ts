import { Entity, EntityOptions } from './entity';
import { Splash, SplashOptions } from './splash';
export interface MatrixOptions {
    font: FontOptions;
    symbols?: () => string;
    splash?: SplashOptions;
    entity?: EntityOptions;
    autoresize?: boolean;
    tracesCount?: number;
}
export declare type MatrixDynamicOptions = Pick<MatrixOptions, 'splash' | 'symbols'> & {
    entity: Omit<EntityOptions, 'files' | 'count'>;
};
interface FontOptions {
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
    handleResize(): void;
    setOptions(options: Partial<MatrixDynamicOptions>): void;
    private setSize;
    private initTraces;
    private render;
}
export {};
