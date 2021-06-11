import { Matrix as _Matrix, MatrixOptions } from './matrix'

class Matrix {
  private _: _Matrix

  constructor(options: MatrixOptions) {
    this._ = new _Matrix(options)
  }

  get isRunning(): boolean {
    return this._.running
  }

  start(): void {
    this._.start()
  }

  stop(): void {
    this._.stop()
  }

  clear(): void {
    this._.clear()
  }

  pause(): void {
    this._.pause()
  }
}

export { Matrix, MatrixOptions }