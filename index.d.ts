import { HTMLTarget, MatrixOptions } from './matrix';
declare class Matrix {
    private _;
    constructor(container: HTMLTarget, opts: MatrixOptions);
    get isRunning(): boolean;
    start(): void;
    stop(): void;
    clear(): void;
    pause(): void;
}
export { Matrix, MatrixOptions };
