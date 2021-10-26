import { randomInt } from './utils'
import { Entity, EntityOptions } from './entity'
import { Splash, SplashOptions } from './splash'

export type { SplashOptions, EntityOptions }

export interface MatrixOptions {
  font: Font
  symbols?: () => string
  splash?: SplashOptions
  entity?: EntityOptions
  autoresize?: boolean
  tracesCount?: number
}

export interface Font {
  family: string
  file: string
  size: number,
  colors: string[]
}

export interface Sizes {
  width?: number
  height?: number
}

export class Matrix {
  public ctx: CanvasRenderingContext2D
  public canvas: HTMLCanvasElement
  public font: FontFace
  public entity: Entity
  public splash: Splash

  private target: HTMLElement
  private fontSize: number
  private tracesCount: number
  private autoresize: boolean
  private running = false
  private colors: string[]
  private traces: number[] = []
  private symbols: (() => string) | undefined

  constructor(container: HTMLElement, opts: MatrixOptions) {
    this.target = container
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.target.appendChild(this.canvas)

    this.entity = new Entity(this, opts.entity)
    this.splash = new Splash(this, opts.splash)
    this.font = new FontFace(opts.font.family, `url(${opts.font.file})`)

    this.fontSize = opts.font.size
    this.tracesCount = Math.round(window.innerWidth / 10)
    this.autoresize = opts.autoresize ?? true
    this.symbols = opts.symbols
    this.colors = opts.font.colors || [
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

  get isRunning(): boolean {
    return this.running
  }

  start(): void {
    if (this.running) return

    this.font.load().then(() => {
      this.running = true
      this.render()
      this.splash.start()
      this.entity.start()
    }).catch(() => {
      throw new Error('Failed loading `font.file`')
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
    this.entity.clear()
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

  private initTraces(): void {
    while (this.traces.length !== this.tracesCount) {
      this.traces.push(randomInt(0, 1000))
    }
  }

  private render(): void {
    if (!this.ctx || !this.running) return
    if (this.traces.length !== this.tracesCount) this.initTraces()

    window.requestAnimationFrame(() => this.render())

    this.ctx.fillStyle = 'rgba(0, 0, 0, .05)'
    this.ctx.fillRect(0, 0, this.canvas.width - window.devicePixelRatio, this.canvas.height - window.devicePixelRatio)
    this.ctx.fillStyle = this.randomColor()
    this.ctx.font = `${this.fontSize}pt ${this.font.family}`

    this.traces.map((y, i) => {
      const symbol = this.symbols?.call(this) || String.fromCharCode(100 + 28 * Math.random())
      const x = (i * this.fontSize) + this.fontSize
      this.ctx.fillText(symbol, x, y)

      if (y > 100 + Math.random() * 10000) {
        this.traces[i] = 0
      } else {
        this.traces[i] = y + 10
      }
    })
  }
}