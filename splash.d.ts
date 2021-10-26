import { Matrix } from './matrix';
export interface SplashOptions {
    interval?: number;
    enable: boolean;
    colors: string[];
    texts: string[];
    size?: number;
}
export declare class Splash {
    private matrix;
    private interval;
    options: Required<SplashOptions>;
    private isVisible;
    constructor(matrix: Matrix, options: SplashOptions | undefined);
    private randomSplash;
    private updateVisibleState;
    start(): void;
    stop(): void;
    private render;
}
