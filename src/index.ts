import { Matrix as _Matrix, MatrixOptions, EntityOptions } from './matrix'

type MatrixDynamicOptions = Pick<MatrixOptions, 'splash' | 'symbols'> & {
  entity: Omit<EntityOptions, 'files' | 'count'>
}

class Matrix {
  private _: _Matrix

  constructor(container: HTMLElement, options: MatrixOptions) {
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
    Object.assign(this._, options)
  }
}

export { Matrix, MatrixOptions }