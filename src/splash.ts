import { randomInt } from './helpers.js'
import { Matrix } from './matrix.js'
import { opts } from './options.js'

export class Splash {
  private matrix: Matrix
  private interval: ReturnType<typeof setInterval> | null
  private isVisible = true

  constructor(matrix: Matrix) {
    this.matrix = matrix
  }

  private randomSplash(): string {
    return opts.splash.texts[randomInt(0, opts.splash.texts.length - 1)]
  }

  private updateVisibleState(): void {
    this.isVisible = document.visibilityState !== 'hidden'
  }

  start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.updateVisibleState()
        this.render()
      }, opts.splash.interval)
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  private render(): void {
    if (!this.isVisible) return
    if (!this.matrix.ctx || !this.matrix.isRunning) return

    this.matrix.ctx.save()

    if (!opts.splash.enabled) return

    this.matrix.ctx.fillStyle = this.matrix.getColor()
    this.matrix.ctx.font = `${opts.splash.size / window.devicePixelRatio}pt ${
      this.matrix.font.family
    }`
    this.matrix.ctx.rotate(randomInt(0, 360))
    this.matrix.ctx.fillText(
      this.randomSplash(),
      randomInt(200, this.matrix.canvas.width - 200),
      randomInt(200, this.matrix.canvas.height - 200)
    )
    this.matrix.ctx.restore()
  }
}
