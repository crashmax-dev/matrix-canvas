import type { Matrix } from './matrix.js'
import { opts } from './options.js'

export class Resize {
  constructor(private readonly matrix: Matrix) {
    this.handleResize = this.handleResize.bind(this)
  }

  mount(): void {
    if (opts.autoresize) {
      window.addEventListener('resize', this.handleResize, false)
    }
  }

  unmount(): void {
    if (opts.autoresize) {
      window.removeEventListener('resize', this.handleResize, false)
    }
  }

  private handleResize(): void {
    this.matrix.clear()
    this.matrix.updateSize()
  }
}
