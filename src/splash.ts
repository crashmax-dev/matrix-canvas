import { Matrix } from './matrix'
import { randomInt } from './helpers'

export interface SplashOptions {
  interval?: number
  enabled: boolean
  colors: string[]
  texts: string[]
  size?: number
}

export class Splash {
  private matrix: Matrix
  private interval: ReturnType<typeof setInterval> | null
  public options: Required<SplashOptions> = {
    interval: 200,
    enabled: false,
    colors: [],
    texts: [],
    size: 40
  }
  private isVisible = true

  constructor(matrix: Matrix, options: SplashOptions | undefined) {
    this.matrix = matrix
    this.options = { ...this.options, ...options }
  }

  private randomSplash(): string {
    return this.options.texts[randomInt(0, this.options.texts.length - 1)]
  }

  private updateVisibleState(): void {
    this.isVisible = document.visibilityState !== 'hidden'
  }

  start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.updateVisibleState()
        this.render()
      }, this.options.interval)
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

    if (!this.options.enabled) return

    this.matrix.ctx.fillStyle = this.matrix.randomColor()
    this.matrix.ctx.font = `${this.options.size / window.devicePixelRatio}pt ${this.matrix.font.family}`
    this.matrix.ctx.rotate(randomInt(0, 360))
    this.matrix.ctx.fillText(
      this.randomSplash(),
      randomInt(200, this.matrix.canvas.width - 200),
      randomInt(200, this.matrix.canvas.height - 200)
    )
    this.matrix.ctx.restore()
  }
}