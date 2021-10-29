import { Matrix } from './matrix';
export interface EntityOptions {
    files: string[];
    enabled?: boolean;
    size?: number;
    rotate?: [number, number];
    opacity?: number;
    speed?: number;
    count?: number;
}
export declare class Entity {
    private matrix;
    options: Required<EntityOptions>;
    private flyingEntities;
    private interval;
    constructor(matrix: Matrix, options: EntityOptions | undefined);
    private randomImage;
    start(): void;
    stop(): void;
    clear(): void;
    private createEntity;
    private render;
}
