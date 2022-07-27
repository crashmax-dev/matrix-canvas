import type { MatrixDynamicOptions, MatrixOptions } from './matrix'
import { Matrix as _Matrix } from './matrix.js'

class Matrix {
  private _: _Matrix

  constructor(container: Element, options: MatrixOptions) {
    this._ = new _Matrix(container, options)
  }

  get isRunning(): boolean {
    return this._.isRunning
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

  setOptions(options: Partial<MatrixDynamicOptions>): void {
    this._.setOptions(options)
  }
}

export { Matrix, MatrixOptions }
