import { MatrixOptions, EntityOptions } from './matrix';
declare type MatrixDynamicOptions = Pick<MatrixOptions, 'splash' | 'symbols'> & {
    entity: Omit<EntityOptions, 'files' | 'count'>;
};
declare class Matrix {
    private _;
    constructor(container: HTMLElement, options: MatrixOptions);
    get isRunning(): boolean;
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
    setOptions(options: Partial<MatrixDynamicOptions>): void;
}
export { Matrix, MatrixOptions };
