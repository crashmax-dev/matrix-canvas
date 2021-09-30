import { Matrix } from './matrix';
export interface SplashesOptions {
    interval?: number;
    enable: boolean;
    colors: string[];
    texts: string[];
    size?: number;
}
export declare class Splash {
    private matrix;
    private interval;
    private options;
    private isVisible;
    constructor(matrix: Matrix, options: SplashesOptions | undefined);
    private randomSplash;
    private updateVisibleState;
    start(): void;
    stop(): void;
    private render;
}
