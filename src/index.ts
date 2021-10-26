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
    if (options.entity) {
      Object.assign(this._.entity.options, options.entity)
      delete options.entity
    }

    if (options.splash) {
      Object.assign(this._.splash.options, options.splash)
      delete options.splash
    }

    Object.assign(this._, options)
  }
}

export { Matrix, MatrixOptions }