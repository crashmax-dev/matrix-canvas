import { Matrix } from './matrix';
interface SplashesOptions {
    interval?: number;
    enable: boolean;
    colors: string[];
    texts: string[];
    size?: number;
}
declare class Splash {
    private matrix;
    private interval;
    private options;
    constructor(matrix: Matrix, options: SplashesOptions | undefined);
    private randomSplash;
    start(): void;
    stop(): void;
    private render;
}
export { Splash, SplashesOptions };
