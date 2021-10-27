import { MatrixOptions, MatrixDynamicOptions } from './matrix';
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
