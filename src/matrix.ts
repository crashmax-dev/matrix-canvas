import { Splash, SplashesOptions } from './splash'
import { useRender, randomInt } from './utils'

type HTMLTarget = HTMLElement | Element

interface MatrixOptions {
  target: HTMLTarget
  font: Font
  symbols?: () => string
  splashes?: SplashesOptions
  autoresize?: boolean
  tracesCount?: number
}

interface Font {
  family: string
  file: string
  size: number,
  colors: string[]
}

interface Sizes {
  width?: number
  height?: number
}

class Matrix {
  public ctx: CanvasRenderingContext2D
  public canvas: HTMLCanvasElement
  public font: FontFace
  public splash: Splash
  public target: HTMLTarget
  public fontSize: number
  public tracesCount: number
  public autoresize: boolean
  public running = false
  public colors: string[]
  public traces: number[] = []
  public symbols: (() => string) | undefined

  constructor(options: MatrixOptions) {
    this.target = options.target
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.target.appendChild(this.canvas)

    this.splash = new Splash(this, options.splashes)
    this.font = new FontFace(options.font.family, `url(${options.font.file})`)
    this.fontSize = options.font.size
    this.tracesCount = options.tracesCount || 300
    this.autoresize = options.autoresize ?? true
    this.symbols = options.symbols
    this.colors = options.font.colors || [
      '#225400',
      '#66FF00',
      '#155400',
      '#395410',
      '#7FFF00',
      '#005400',
      '#2A5400',
      '#3FFF00',
      '#00FF00',
      '#ADFF2F'
    ]

    if (this.autoresize) {
      window.addEventListener('resize', () => {
        this.setSize()
      })
    }

    this.setSize()
  }

  start(): void {
    if (this.running) return

    this.font.load().then(() => {
      this.running = true
      this.render()
      this.splash.start()
    }).catch(() => {
      throw new Error('Failed loading font!')
    })
  }

  stop(): void {
    this.running = false
    this.clear()
  }

  clear(): void {
    if (!this.ctx) return

    this.traces = []
    this.ctx.save()
    this.ctx.globalCompositeOperation = 'copy'
    this.ctx.lineTo(0, 0)
    this.ctx.stroke()
    this.ctx.restore()
  }

  pause(): void {
    this.running = !this.running
    if (this.running) this.render()
  }

  randomColor(): string {
    return this.colors[randomInt(0, this.colors.length - 1)]
  }

  private setSize({
    width = this.target.clientWidth,
    height = this.target.clientHeight
  }: Sizes = {}): void {
    this.canvas.width = width
    this.canvas.height = height
  }

  private initTraces() {
    while (this.traces.length !== this.tracesCount) {
      this.traces.push(randomInt(0, 1000))
    }
  }

  private render(): void {
    if (!this.ctx || !this.running) return
    if (this.traces.length !== this.tracesCount) this.initTraces()

    useRender(() => this.render())

    this.ctx.fillStyle = 'rgba(0, 0, 0, .05)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = this.randomColor()
    this.ctx.font = `${this.fontSize}pt ${this.font.family}`

    this.traces.map((y, i) => {
      const symbol = this.symbols?.call(this) || String.fromCharCode(100 + 28 * Math.random())
      const x = (i * 10) + 10
      this.ctx.fillText(symbol, x, y)

      if (y > 100 + Math.random() * 10000) {
        this.traces[i] = 0
      } else {
        this.traces[i] = y + 10
      }
    })
  }
}

export { Matrix, MatrixOptions }