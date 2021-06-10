import { getRender } from './utils/getRender'

type HTMLTarget = HTMLElement | Element

interface MatrixOptions {
  target: HTMLTarget
  font: Font
  symbols?: () => string
  splashes?: Splashes
  autoresize?: boolean
  tracesCount?: number
}

interface Splashes {
  interval: number
  enable: boolean
  colors: string[]
  texts: string[]
  size: number
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

export class Matrix {
  private _target: HTMLTarget
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _font: FontFace
  private _fontSize: number
  private _tracesCount: number
  private _autoresize: boolean

  private _running = false
  private _colors: string[]
  private _traces: number[] = []
  private _symbols: (() => string) | undefined
  private _splashInterval: NodeJS.Timeout | null
  private _splashes: Splashes = {
    interval: 200,
    enable: false,
    colors: [],
    texts: [],
    size: 40
  }

  constructor(options: MatrixOptions) {
    this._target = options.target
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._target.appendChild(this._canvas)

    this._font = new FontFace(options.font.family, `url(${options.font.file})`)
    this._fontSize = options.font.size
    this._tracesCount = options.tracesCount || 300
    this._autoresize = options.autoresize ?? true
    this._symbols = options.symbols
    this._splashes = { ...this._splashes, ...options.splashes }
    this._colors = options.font.colors || [
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

    if (this._autoresize) {
      window.addEventListener('resize', () => {
        this.size()
      })
    }

    this.size()
  }

  get inRunning(): boolean {
    return this._running
  }

  start(): void {
    if (this._running) return

    this._font.load().then(() => {
      this._running = true
      this.render()
      this.startSplash()
    }).catch(() => {
      throw new Error('Failed loading font!')
    })
  }

  stop(): void {
    this._running = false
    this.clear()
  }

  clear(): void {
    if (!this._ctx) return

    this._traces = []
    this._ctx.save()
    this._ctx.globalCompositeOperation = 'copy'
    this._ctx.lineTo(0, 0)
    this._ctx.stroke()
    this._ctx.restore()
    this.stopSplash()
  }

  pause(): void {
    this._running = !this._running
    if (this._running) this.render()
  }

  size({
    width = this._target.clientWidth,
    height = this._target.clientHeight
  }: Sizes = {}): void {
    this._canvas.width = width
    this._canvas.height = height
  }

  private initTraces() {
    while (this._traces.length !== this._tracesCount) {
      this._traces.push(this.randomInt(0, 1000))
    }
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }

  private randomColor(): string {
    return this._colors[this.randomInt(0, this._colors.length - 1)]
  }

  private randomSplash(): string {
    return this._splashes.texts[this.randomInt(0, this._splashes.texts.length - 1)]
  }

  private startSplash(): void {
    if (!this._splashInterval) {
      this._splashInterval = setInterval(() => {
        this.renderSplash()
      }, this._splashes.interval)
    }
  }

  private stopSplash(): void {
    if (this._splashInterval) {
      clearInterval(this._splashInterval)
      this._splashInterval = null
    }
  }

  private renderSplash(): void {
    if (!this._ctx || !this._running) return

    this._ctx.save()
    this._ctx.fillStyle = this.randomColor()
    this._ctx.font = `${this._splashes.size}pt ${this._font.family}`
    this._ctx.rotate(this.randomInt(0, 360))
    this._ctx.fillText(
      this.randomSplash(),
      this.randomInt(200, this._canvas.width - 200),
      this.randomInt(200, this._canvas.height - 200)
    )
    this._ctx.restore()
  }

  private render(): void {
    if (!this._ctx || !this._running) return
    if (this._traces.length !== this._tracesCount) this.initTraces()

    getRender(() => this.render())

    this._ctx.fillStyle = 'rgba(0, 0, 0, .05)'
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
    this._ctx.fillStyle = this.randomColor()
    this._ctx.font = `${this._fontSize}pt ${this._font.family}`

    this._traces.map((y, i) => {
      const symbol = this._symbols?.call(this) || String.fromCharCode(100 + 28 * Math.random())
      const x = (i * 10) + 10
      this._ctx.fillText(symbol, x, y)

      if (y > 100 + Math.random() * 10000) {
        this._traces[i] = 0
      } else {
        this._traces[i] = y + 10
      }
    })
  }
}