import { MatrixOptions } from './matrix';
declare class Matrix {
    private _;
    constructor(container: HTMLElement, options: MatrixOptions);
    get isRunning(): boolean;
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
}
export { Matrix, MatrixOptions };
