import { Matrix } from './matrix';
interface EntityOptions {
    files: string[];
    width?: [number, number];
    rotate?: [number, number];
    opacity?: number;
    speed?: number;
    count?: number;
}
declare class Entity {
    private matrix;
    private options;
    private flyingEntitys;
    private interval;
    constructor(matrix: Matrix, options: EntityOptions | undefined);
    private randomSprite;
    start(): void;
    stop(): void;
    clear(): void;
    private entity;
    private render;
}
export { Entity, EntityOptions };
