import { Matrix } from './matrix'
import { randomInt } from './utils'

interface SplashesOptions {
  interval?: number
  enable: boolean
  colors: string[]
  texts: string[]
  size?: number
}

class Splash {
  private matrix: Matrix
  private interval: NodeJS.Timeout | null
  private options: Required<SplashesOptions> = {
    interval: 200,
    enable: false,
    colors: [],
    texts: [],
    size: 40
  }

  constructor(matrix: Matrix, options: SplashesOptions | undefined) {
    this.matrix = matrix
    this.options = { ...this.options, ...options }
  }

  private randomSplash(): string {
    return this.options.texts[randomInt(0, this.options.texts.length - 1)]
  }

  start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
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
    if (!this.matrix.ctx || !this.matrix.running) return

    this.matrix.ctx.save()
    this.matrix.ctx.fillStyle = this.matrix.randomColor()
    this.matrix.ctx.font = `${this.options.size}pt ${this.matrix.font.family}`
    this.matrix.ctx.rotate(randomInt(0, 360))
    this.matrix.ctx.fillText(
      this.randomSplash(),
      randomInt(200, this.matrix.canvas.width - 200),
      randomInt(200, this.matrix.canvas.height - 200)
    )
    this.matrix.ctx.restore()
  }
}

export { Splash, SplashesOptions }