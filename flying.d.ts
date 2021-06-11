import { Matrix } from './matrix';
interface FlyingsOptions {
    sprites: string[];
    width?: [number, number];
    rotate?: [number, number];
    opacity?: number;
    speed?: number;
    count?: number;
}
declare class Flying {
    private matrix;
    private options;
    private entity;
    private interval;
    constructor(matrix: Matrix, options: FlyingsOptions | undefined);
    private randomSprite;
    start(): void;
    stop(): void;
    clear(): void;
    private initSprites;
    private render;
}
export { Flying, FlyingsOptions };
