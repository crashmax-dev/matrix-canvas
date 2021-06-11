import { Matrix } from './matrix';
interface SplashesOptions {
    interval: number;
    enable: boolean;
    colors: string[];
    texts: string[];
    size: number;
}
declare class Splash {
    private matrix;
    private interval;
    private splashes;
    constructor(matrix: Matrix, splashes: SplashesOptions | undefined);
    private randomSplash;
    start(): void;
    stop(): void;
    render(): void;
}
export { Splash, SplashesOptions };
